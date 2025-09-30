from run import create_app, db

app = create_app()

# Para que Alembic vea la metadata
from app.models import User  
