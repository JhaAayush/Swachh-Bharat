from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Text
db = SQLAlchemy()

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.String(255), primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    binary_data = db.Column(db.LargeBinary, nullable=True)  # Added binary_data column

    def __init__(self, id, filename, description, binary_data):  # Updated constructor
        self.id = id
        self.description = description
        self.filename = filename
        self.binary_data = binary_data

    def get_id(self):
        return self.id


class Blog(db.Model):
    __tablename__ = 'blog'
    id = db.Column(db.String(255), primary_key=True)
    blog_title = db.Column(db.String(255), nullable=False)
    blog_body = db.Column(Text, nullable=False)

    def __init__(self,id,blog_title,blog_body):
        self.id = id
        self.blog_title = blog_title
        self.blog_body = blog_body

    def get_id(self):
        return self.id