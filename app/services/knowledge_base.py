from langchain_openai import OpenAIEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from pymongo import MongoClient
from app.core.config import settings
from app.models.doctor import DoctorProfile

# 1. Setup Embeddings (Can swap this for Local HuggingFaceEmbeddings if strict security required)
embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)

# 2. Connect to Atlas
client = MongoClient(settings.MONGODB_URL)
collection = client[settings.DB_NAME]["vector_store"]

vector_store = MongoDBAtlasVectorSearch(
    collection=collection,
    embedding=embeddings,
    index_name="default",  # The index you created in Step 1
    relevance_score_fn="cosine",
)

async def sync_doctors_to_vector_store():
    """
    Reads all doctors from DB, converts to text, embeds them, and saves to Vector Store.
    """
    doctors = await DoctorProfile.find_all().to_list()
    
    docs_to_embed = []
    ids = []
    
    for doc in doctors:
        # Create a text representation of the doctor
        text_content = f"""
        Name: {doc.name}
        Specialization: {doc.specialization}
        Degrees: {doc.degrees}
        Experience: {doc.years_experience} years
        Hospital Branch: {doc.branch}
        Availability: {doc.availability}
        """
        docs_to_embed.append(text_content)
        ids.append(str(doc.id))

    # This sends data to Embedding Model -> Atlas
    if docs_to_embed:
        vector_store.add_texts(texts=docs_to_embed, metadatas=[{"source": "doctor"} for _ in ids])
        print(f"✅ Synced {len(docs_to_embed)} doctor profiles to AI Memory.")