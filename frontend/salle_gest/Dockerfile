# Utilise une image Python officielle comme base
FROM python:3.10  -slim

# Définit le répertoire de travail dans le conteneur
WORKDIR /gestion

# Copie les fichiers de l'application dans le conteneur
COPY . .
# Installe les outils de dev

RUN apt-get update && apt-get install -y build-essential python3-dev
# Installe les dépendances nécessaires
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Applique les migrations de la base de données
# RUN python manage.py makemigrations
# RUN python manage.py migrate
# RUN python manage.py create_superuser --telephone 0123456789 --password your_password


# Expose le port 8000 (pour un serveur Django par exemple)
EXPOSE 8000

# Commande pour lancer l'application

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]