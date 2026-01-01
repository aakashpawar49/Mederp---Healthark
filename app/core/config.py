import os
from pydantic_settings import BaseSettings, SettingsConfigDict

# 1. Calculate the absolute path to the .env file
# __file__ = .../app/core/config.py
# dirname  = .../app/core
# dirname  = .../app (This is where your .env is)
DOTENV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")

class Settings(BaseSettings):
    # These match the variables in your .env file
    MONGODB_URL: str
    DB_NAME: str

    # 2. Tell Pydantic to read from the calculated path
    model_config = SettingsConfigDict(
        env_file=DOTENV_PATH,
        env_ignore_empty=True,
        extra="ignore" 
    )

settings = Settings()