from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr, Field
import os

class Settings(BaseSettings):
    bot_token: SecretStr
    local: bool = Field(default=False)
    model_config: SettingsConfigDict = SettingsConfigDict (
        env_file=os.path.join(os.path.dirname(__file__), ".env"),
        env_file_encoding="utf-8"
    )
    
    
config = Settings()