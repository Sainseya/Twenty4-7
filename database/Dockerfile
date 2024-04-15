# Utilisation de l'image officielle de PostgreSQL
FROM postgres:latest

# Définition des variables d'environnement pour définir l'utilisateur, le mot de passe et le nom de la base de données
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin
ENV POSTGRES_DB twenty4-seven-db

# Optionnel : vous pouvez personnaliser la configuration de PostgreSQL en ajoutant des fichiers de configuration
# COPY postgresql.conf /etc/postgresql/postgresql.conf

EXPOSE 5432

CMD ["postgres"]
