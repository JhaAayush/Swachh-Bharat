from flask import Flask, render_template, request, jsonify, redirect
from server.models import db, Image, Blog
from flask_cors import CORS
import uuid
from sqlalchemy.orm.exc import NoResultFound

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{app.root_path}/server/database/database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"})
    print(f"Request files :{request.files}")
    image = request.files['image']
    description = request.form.get('description', "No description provided")
    print(f"Description : {description}")
    print(image)
    if image.filename == '':
        return jsonify({"error": "No selected file"})

    try:
        # Create an Image object and store it in the database
        new_image = Image(filename=image.filename, binary_data=image.read(), id=create_uuid(), description=description)
        db.session.add(new_image)
        db.session.commit()
        
        return jsonify({"message": "File uploaded successfully"})
    except Exception as e:
        print(e)
        return jsonify({"error": "File upload failed"})


    # if image:
    #     image.save(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))
    #     return jsonify({"message": "File uploaded successfully"})

    # return jsonify({"error": "File upload failed"})
import base64

@app.route('/send-images', methods=['GET'])
def send_images():
    try:
        images = Image.query.all()
        image_list = [{"filename": image.filename, "binary_data": base64.b64encode(image.binary_data).decode("utf-8"), "description": image.description} for image in images]
        return jsonify({"images": image_list})
    except NoResultFound:
        return jsonify({"images": []})


@app.route('/blogs', methods=['GET', 'POST'])
def blog():
    print("In Blogs")
    try:
        blogs = Blog.query.all()
        blog_list = []
    
        for blog in blogs:
            blog_list.append({
                'blog_title': blog.blog_title,
                'blog_body': blog.blog_body
            })
        print("Exiting blog")
    
        return render_template('list.html', blogs=blog_list)
    except:
        print("No Blog present")
        return render_template('blog2.html')

@app.route('/blog/<string:blog_id>', methods=['GET'])
def show_blog(blog_id):
    blog = Blog.query.get(blog_id)
    if blog:
        return jsonify({
            "blog_title": blog.blog_title,
            "blog_body": blog.blog_body
        })
    else:
        return jsonify({"error": "Blog not found"})

@app.route('/read-blog/<string:blog_id>')
def read_blog(blog_id):
    blog = Blog.query.get(blog_id)
    return render_template('blog.html', blog=blog)





@app.route('/fetch-blogs', methods=['GET'])
def fetch_blogs():
    if request.method == 'GET':
        print("Inside GET")
        blogs = Blog.query.all()
        blog_list = []
        for blog in blogs:
            blog_list.append({
                'blog_title': blog.blog_title,
                'blog_body': blog.blog_body,
                'blog_id': blog.id
            })
        print("Fetching Blog")
        return jsonify({"blogs": blog_list})
    print("Didnt Work")
    return f"Fuck"
@app.route('/pixart', methods=['GET', 'POST'])
def pixart():
    return render_template('pixart.html')

@app.route('/write', methods=['GET','POST'])
def write():
    if request.method == 'POST':
        print("In POST in write")
        print(request.form)
        new_blog = Blog(id=create_uuid(),blog_title=request.form.get('blogTitle'), blog_body=request.form.get('blogBody'))
        db.session.add(new_blog)
        db.session.commit()
        return redirect('/blogs')
        return jsonify({"error": "I am an idiot."})
    return render_template('write.html')



def create_uuid():
    return str(uuid.uuid1())

if __name__ == '__main__':
    app.run(debug=True)
