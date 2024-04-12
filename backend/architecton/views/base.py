from pydantic import AliasGenerator, ConfigDict
from pydantic.alias_generators import to_camel

from tortoise.contrib.pydantic import PydanticModel


class BaseViewModel(PydanticModel):
    """
    Stretch base model (pydantic model)
    """

    model_config = ConfigDict(
        alias_generator=AliasGenerator(
            validation_alias=to_camel,
            serialization_alias=to_camel,
        ),
        populate_by_name=True,
        extra="ignore",
    )
