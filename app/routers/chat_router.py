from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.knowledge_base import vector_store
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI 

# If you want LOCAL LLM, uncomment this:
# from langchain_community.llms import Ollama 
# llm = Ollama(model="llama3") 

router = APIRouter(prefix="/chat", tags=["AI Chatbot"])

# Initialize LLM (The reasoning engine)
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

# The Strict Prompt (Prevent Hallucination)
prompt_template = """
You are a secure medical assistant for MedERP.
Use the following pieces of context to answer the question at the end.
If you don't know the answer from the context, just say "I don't have that information in my database." DO NOT try to make up an answer.

Context:
{context}

Question: {question}
Answer:"""

PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vector_store.as_retriever(search_kwargs={"k": 3}), # Find top 3 matches
    chain_type_kwargs={"prompt": PROMPT}
)

class ChatRequest(BaseModel):
    query: str
    mode: str = "auto"  # 'auto', 'generic', 'specific'

@router.post("/ask")
async def ask_med_bot(request: ChatRequest):
    query = request.query.lower()
    
    # --- LEVEL 1: GENERIC GUARDRAILS (Local Rule-Based) ---
    # Fast, free, and secure for simple stuff
    greetings = ["hi", "hello", "hey", "help"]
    if any(x in query for x in greetings):
        return {
            "answer": "Hello! I am your MedERP Assistant. I can help you find doctors, medicines, or check your appointment status.",
            "source": "generic_rule"
        }

    # --- LEVEL 2: DEDICATED VECTOR SEARCH (The RAG Core) ---
    try:
        # 1. Search Atlas for relevant data (Doctors, Inventory, etc.)
        # 2. Feed that data to LLM
        # 3. Get strict answer
        response = qa_chain.invoke(request.query)
        
        return {
            "answer": response['result'],
            "source": "vector_search"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))