import json
import os.path

from architecton.views.project_list import ProjectListOut

assets_dir = f"{os.path.dirname(os.path.dirname(__file__))}/assets"


class ProjectController:

    @staticmethod
    async def get_projects():
        with open(f"{assets_dir}/projects.json") as f:
            projects = json.load(f)
        with open(f"{assets_dir}/tokens.json") as f:
            tokens = json.load(f)

        return ProjectListOut.model_validate({"games": projects, "tokens": tokens})
