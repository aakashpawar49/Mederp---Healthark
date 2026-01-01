from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # These match the variables in your .env file
    MONGODB_URL: str
    DB_NAME: str

    class Config:
        env_file = ".env"

settings = Settings()