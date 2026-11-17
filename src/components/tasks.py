
# Test these URLs:

# | URL                            | Expected page |
# | ------------------------------ | ------------- |
# | `http://127.0.0.1:8000/`       | Home          |
# | `http://127.0.0.1:8000/about/` | About         |

# Both pages should have the same navbar and footer but different content and page titles.

# ## 10. Important Django Template Tags

# | Tag              | Purpose                       |
# | ---------------- | ----------------------------- |
# | `{% extends %}`  | Inherit another template      |
# | `{% block %}`    | Define overridable sections   |
# | `{% endblock %}` | Close a block                 |
# | `{% include %}`  | Include reusable templates    |
# | `{% if %}`       | Conditional rendering         |
# | `{% for %}`      | Loop through data             |
# | `{% empty %}`    | Handle empty collections      |
# | `{% url %}`      | Generate URLs using URL names |


# Static Files vs Media Files in Django


# ## The core idea

# | | Static files | Media files |
# |---|---|---|
# | **What** | Files **you** write as the developer | Files **users** upload |
# | **Examples** | CSS, JavaScript, logo, icons, background images | Profile photos, product images, PDFs, resumes |
# | **Changes at runtime?** | No, only when you edit the code | Yes, whenever someone uploads |
# | **Settings** | `STATIC_URL`, `STATICFILES_DIRS`, `STATIC_ROOT` | `MEDIA_URL`, `MEDIA_ROOT` |

# ---

# ## Part 1: Static files

# ### Step 1: Folder structure

# ```
# myproject/
# ├── manage.py
# ├── myproject/
# │   ├── settings.py
# │   └── urls.py
# ├── myapp/
# ├── static/              ← create this at project level
# │   ├── css/
# │   │   └── style.css
# │   ├── js/
# │   │   └── script.js
# │   └── images/
# │       └── logo.png
# └── templates/
#     └── index.html
# ```

# ### Step 2: settings.py

# ```python
# import os
# from pathlib import Path

# BASE_DIR = Path(__file__).resolve().parent.parent

# STATIC_URL = '/static/'                       # URL prefix in the browser

# STATICFILES_DIRS = [BASE_DIR / 'static']      # where YOU keep static files

# STATIC_ROOT = BASE_DIR / 'staticfiles'        # used only in production (collectstatic)
# ```

# Make sure `'django.contrib.staticfiles'` is in `INSTALLED_APPS` (it is by default).

# ### Step 3: Use in a template

# ```html
# {% load static %}   <!-- must be at the top of EVERY template that uses static -->
# <!DOCTYPE html>
# <html>
# <head>
#     <link rel="stylesheet" href="{% static 'css/style.css' %}">
# </head>
# <body>
#     <img src="{% static 'images/logo.png' %}" alt="Logo">
#     <script src="{% static 'js/script.js' %}"></script>
# </body>
# </html>
# ```

# That's all you need for development. `runserver` serves static files automatically when `DEBUG = True`.

# ---

# ## Part 2: Media files

# ### Step 1: Install Pillow (needed for ImageField)

# ```bash
# pip install Pillow
# ```

# ### Step 2: settings.py

# ```python
# MEDIA_URL = '/media/'                  # URL prefix
# MEDIA_ROOT = BASE_DIR / 'media'        # folder on disk where uploads are saved
# ```

# Django creates the `media/` folder automatically on the first upload.

# ### Step 3: urls.py (project level)

# Django does not serve media files by default, so add this for development:

# ```python
# from django.contrib import admin
# from django.urls import path
# from django.conf import settings
# from django.conf.urls.static import static

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # your other paths
# ]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# ```

# ### Step 4: models.py

# ```python
# from django.db import models

# class Profile(models.Model):
#     name = models.CharField(max_length=100)
#     photo = models.ImageField(upload_to='profiles/')    # saved to media/profiles/
#     resume = models.FileField(upload_to='resumes/', blank=True)  # for any file type
# ```

# Then run:

# ```bash
# python manage.py makemigrations
# python manage.py migrate
# ```

# ### Step 5: Upload form (template)

# ```html
# <form method="POST" enctype="multipart/form-data">
#     {% csrf_token %}
#     <input type="text" name="name">
#     <input type="file" name="photo">
#     <button type="submit">Upload</button>
# </form>
# ```

# `enctype="multipart/form-data"` is mandatory. Without it, the file will not upload.

# ### Step 6: views.py

# ```python
# from django.shortcuts import render, redirect
# from .models import Profile

# def upload(request):
#     if request.method == 'POST':
#         Profile.objects.create(
#             name=request.POST['name'],
#             photo=request.FILES['photo']      # files come from request.FILES, not POST
#         )
#         return redirect('list')
#     return render(request, 'upload.html')

# def list_profiles(request):
#     profiles = Profile.objects.all()
#     return render(request, 'list.html', {'profiles': profiles})
# ```

# ### Step 7: Display the image

# ```html
# {% for p in profiles %}
#     <h3>{{ p.name }}</h3>
#     <img src="{{ p.photo.url }}" width="150">
# {% endfor %}
# ```

# `p.photo.url` gives `/media/profiles/filename.jpg`.

# ---

# ## Part 3: Production (when you deploy)

# 1. Set `DEBUG = False`.
# 2. Run this to gather all static files into `STATIC_ROOT`:
#    ```bash
#    python manage.py collectstatic
#    ```
# 3. Let a web server (Nginx or Apache) serve `/static/` and `/media/`. For static files only, you can use **WhiteNoise**:
#    ```bash
#    pip install whitenoise
#    ```
#    ```python
#    MIDDLEWARE = [
#        'django.middleware.security.SecurityMiddleware',
#        'whitenoise.middleware.WhiteNoiseMiddleware',   # right after SecurityMiddleware
#        ...
#    ]
#    ```
# 4. For media in production, use Nginx or cloud storage such as AWS S3.

# ---

# ## Common beginner mistakes

# | Problem | Fix |
# |---|---|
# | CSS/images not loading | Missing `{% load static %}` at the top of the template |
# | Static still not loading | Folder not listed in `STATICFILES_DIRS`, or server not restarted |
# | Uploaded image gives 404 | Forgot the `static(settings.MEDIA_URL, ...)` line in `urls.py` |
# | File not uploading | Missing `enctype="multipart/form-data"` on the form |
# | `request.POST['photo']` error | Use `request.FILES['photo']` |
# | `ImageField` error | Pillow is not installed |
# | Wrong folder confusion | `STATICFILES_DIRS` is where you put files. `STATIC_ROOT` is where `collectstatic` copies them. |

# ---

# ## Easy way to remember

# - **Static** is your own code assets. Use `{% static '...' %}`.
# - **Media** is what users upload. Use `model.field.url`.
# - **Static folder** is where you put files. **Media folder** is where Django puts files.

# If you'd like, I can build a small working mini-project (upload and display profile photos) that you can run and practice with.