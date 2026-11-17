from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),

    path('about/', views.about, name='about'),

    path('employees/<int:employee_id>/', views.employee_detail, name='employee_detail'),
]

# Step 10: Django Templates – Display HTML Pages
# Until now, we have returned plain text using HttpResponse().

# In real-world applications, we need to display HTML pages. Django provides a Template System that allows us to separate HTML from Python business logic.

# In this phase, we'll:
# 1. Create a templates folder.
# 2. Configure the template directory.
# 3. Create HTML pages.
# 4. Render HTML using Django's render() function.
# 5. Pass dynamic data from views to templates.
# 1. Create the Templates Folder
# Inside your project root, create a folder named templates.

# Updated structure:
# employee_management/
# │
# ├── config/
# │   ├── settings.py
# │   └── urls.py
# │
# ├── employees/
# │   ├── migrations/
# │   ├── __init__.py
# │   ├── admin.py
# │   ├── apps.py
# │   ├── models.py
# │   ├── tests.py
# │   ├── views.py
# │   └── urls.py
# │
# ├── templates/
# │   ├── home.html
# │   ├── about.html
# │   └── employee_detail.html
# │
# ├── venv/
# └── manage.py


# 2. Configure the Templates Directory
# Open config/settings.py.

# Find the TEMPLATES configuration.

# Initially, it looks like this:
# TEMPLATES = [    {        'BACKEND': 'django.template.backends.django.DjangoTemplates',        'DIRS': [],        'APP_DIRS': True,        'OPTIONS': {            'context_processors': [                'django.template.context_processors.debug',                'django.template.context_processors.request',                'django.contrib.auth.context_processors.auth',                'django.contrib.messages.context_processors.messages',            ],        },    },]



# Update DIRS:
# 'DIRS': [BASE_DIR / 'templates'],



# Complete configuration:
# TEMPLATES = [    {        'BACKEND': 'django.template.backends.django.DjangoTemplates',        # Tells Django where our project-level templates are stored.        'DIRS': [BASE_DIR / 'templates'],        # Also searches for templates inside individual apps.        'APP_DIRS': True,        'OPTIONS': {            'context_processors': [                'django.template.context_processors.debug',                'django.template.context_processors.request',                'django.contrib.auth.context_processors.auth',                'django.contrib.messages.context_processors.messages',            ],        },    },]



# Why do we configure this?

# Django needs to know where to find HTML files when we use the render() function.
# 3. Create Your First HTML Page
# Open templates/home.html.
# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <meta name="viewport" content="width=device-width, initial-scale=1.0">
#     <title>Employee Management System</title>
# </head>
# <body>

#     <h1>Welcome to Employee Management System</h1>

#     <p>This is our first Django template.</p>

# </body>
# </html>


# 4. Render HTML Using Django Views
# Open employees/views.py.

# Replace your existing code with:
# from django.shortcuts import renderdef home(request):    # render() loads the HTML template and returns an HTTP response.    return render(request, 'home.html')



# Understanding render():
# render(request, 'home.html')



# It accepts:
# - request: Current HTTP request.
# - home.html: Template file to load.
# - Optional third argument: Context data to pass into the template.
# 5. Test Your Application
# Run:
# python manage.py runserver


# Visit:

# http://127.0.0.1:8000/

# You should now see your HTML page instead of plain text.

# 6. Pass Dynamic Data from View to Template
# In real applications, we rarely display static information. We fetch data from databases and display it dynamically.

# Let's understand this with an employee example.

# Update employees/views.py:
# from django.shortcuts import renderdef home(request):    # Sample employee data.    # Later, we will fetch this data from the database.    employee = {        'name': 'Rahul Sharma',        'email': 'rahul@example.com',        'department': 'IT',        'salary': 35000    }  
#   # Pass Python dictionary to the HTML template.    context = {        'employee': employee    }  
# x  return render(request, 'home.html', context)



# Update templates/home.html:
# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <title>Employee Details</title>
# </head>
# <body>

#     <h1>Employee Details</h1>

#     <!-- Django template variables -->
#     <h3>Name: {{ employee.name }}</h3>

#     <p>Email: {{ employee.email }}</p>

#     <p>Department: {{ employee.department }}</p>

#     <p>Salary: {{ employee.salary }}</p>

# </body>
# </html>


# Important: Understand Django Template Syntax
# Syntax	Purpose
# {{ variable }}	Display variable value
# {% if %}	Conditional statements
# {% for %}	Loop through collections
# {% block %}	Define reusable template sections
# {% extends %}	Inherit another template
# {% include %}	Include another HTML template

# For example:
# <h1>{{ employee.name }}</h1>


# Django replaces {{ employee.name }} with the actual value passed from the view.
# 7. Display Multiple Employees Using a Loop
# Now let's pass multiple employees.

# Update employees/views.py:
# from django.shortcuts import renderdef home(request):    employees = [        {            'id': 1,            'name': 'Rahul',            'department': 'IT',            'salary': 35000        },        {            'id': 2,            'name': 'Priya',            'department': 'HR',            'salary': 40000        },        {            'id': 3,            'name': 'Amit',            'department': 'Finance',            'salary': 45000        }    ]    context = {        'employees': employees    }    return render(request, 'home.html', context)



# Update templates/home.html:
# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <title>Employee List</title>
# </head>
# <body>

#     <h1>Employee Management System</h1>

#     <h2>Employee List</h2>

#     <table border="1" cellpadding="10">

#         <thead>
#             <tr>
#                 <th>ID</th>
#                 <th>Name</th>
#                 <th>Department</th>
#                 <th>Salary</th>
#             </tr>
#         </thead>

#         <tbody>

#             <!-- Loop through all employees -->
#             {% for employee in employees %}

#                 <tr>
#                     <td>{{ employee.id }}</td>
#                     <td>{{ employee.name }}</td>
#                     <td>{{ employee.department }}</td>
#                     <td>{{ employee.salary }}</td>
#                 </tr>

#             {% empty %}

#                 <!-- Display when employee list is empty -->
#                 <tr>
#                     <td colspan="4">No employees found.</td>
#                 </tr>

#             {% endfor %}

#         </tbody>

#     </table>

# </body>
# </html>


# Here, {% for %} iterates over the employee list, and {% empty %} displays a message if the list contains no records.

# 8. Practical Tasks
# Complete these before moving forward:
# - [ ] Create about.html and render it through an about view.
# - [ ] Create an employee list containing at least five employees.
# - [ ] Display employee information using an HTML table.
# - [ ] Add an is_active field to employees.
# - [ ] Use {% if %} to display Active or Inactive status.
# - [ ] Display the total number of employees.
# Example conditional:
# {% if employee.is_active %}
#     <span>Active</span>
# {% else %}
#     <span>Inactive</span>
# {% endif %}



# What we have learned so far
# Phase	Topic	Status
# 1	Django installation and setup	Completed
# 2	Create Django application	Completed
# 3	Views and URL routing	Completed
# 4	Dynamic URL parameters	Completed
# 5	Django templates	Current

# Next Phase – Step 11: Template Inheritance

# We'll create a common base.html layout, navbar, footer, reusable content blocks, and use {% extends %} and {% block %}.

# This is important because real Django applications should not repeat the same HTML structure on every page.

# Step 12: Django Static Files – CSS, JavaScript and Images
# In this phase, we'll integrate CSS, JavaScript and images into our Django application.

# We'll style the Employee Management System and understand how Django manages static assets.
# 1. Create Static Folder Structure
# Inside your project root, create a folder named static.

# Where to create: At the same level as manage.py.
# employee_management/
# │
# ├── config/
# │   ├── settings.py
# │   └── urls.py
# │
# ├── employees/
# │   ├── migrations/
# │   ├── models.py
# │   ├── views.py
# │   └── urls.py
# │
# ├── templates/
# │   ├── base.html
# │   ├── includes/
# │   │   ├── navbar.html
# │   │   └── footer.html
# │   └── employees/
# │       ├── home.html
# │       └── about.html
# │
# ├── static/
# │   ├── css/
# │   │   └── style.css
# │   ├── js/
# │   │   └── script.js
# │   └── images/
# │
# ├── manage.py
# └── db.sqlite3


# 2. Configure Static Files
# File: config/settings.py

# Find the following setting:
# STATIC_URL = 'static/'



# Update it:
# # URL prefix used to access static files in templates.STATIC_URL = 'static/'# Project-level directory where CSS, JavaScript and images are stored.STATICFILES_DIRS = [    BASE_DIR / 'static',]# Production destination for collected static files.STATIC_ROOT = BASE_DIR / 'staticfiles'



# Important:
# - STATIC_URL: URL prefix used to reference static files.
# - STATICFILES_DIRS: Additional directories where Django searches for static files.
# - STATIC_ROOT: Destination where collectstatic collects static files for deployment.
# We are using a project-level static folder for this application.
# 3. Connect CSS to Django Templates
# File: templates/base.html

# Replace your existing code with:
# <!DOCTYPE html>
# <html lang="en">

# <head>
#     <meta charset="UTF-8">

#     <meta name="viewport" content="width=device-width, initial-scale=1.0">

#     <title>
#         {% block title %}
#             Employee Management System
#         {% endblock %}
#     </title>

#     <!-- Load Django static template tag library -->
#     {% load static %}

#     <!-- Connect external CSS file -->
#     <link rel="stylesheet" href="{% static 'css/style.css' %}">

# </head>

# <body>

#     {% include 'includes/navbar.html' %}

#     <main class="container">

#         {% block content %}
#         {% endblock %}

#     </main>

#     {% include 'includes/footer.html' %}

#     <!-- Connect external JavaScript file -->
#     <script src="{% static 'js/script.js' %}"></script>

# </body>

# </html>


# Remember: {% load static %} must be included in a template before using {% static %}.
# 4. Write CSS
# File: static/css/style.css

# Add the following code:
# /* Reset default browser spacing */
# * {
#     margin: 0;
#     padding: 0;
#     box-sizing: border-box;
# }

# /* Common body styling */
# body {
#     font-family: Arial, sans-serif;
#     background-color: #f4f6f9;
#     color: #333;
#     line-height: 1.6;
# }

# /* Main navigation */
# nav {
#     background-color: #1e293b;
#     color: white;
#     padding: 18px 40px;

#     display: flex;
#     justify-content: space-between;
#     align-items: center;
# }

# nav h2 {
#     font-size: 22px;
# }

# nav ul {
#     display: flex;
#     list-style: none;
#     gap: 25px;
# }

# nav a {
#     color: white;
#     text-decoration: none;
# }

# nav a:hover {
#     color: #38bdf8;
# }

# /* Main page container */
# .container {
#     max-width: 1100px;
#     margin: 40px auto;
#     padding: 20px;
# }

# /* Page headings */
# h1 {
#     margin-bottom: 15px;
# }

# h2 {
#     margin: 25px 0 15px;
# }

# /* Employee table */
# table {
#     width: 100%;
#     border-collapse: collapse;
#     background-color: white;
#     margin-top: 20px;
# }

# th,
# td {
#     padding: 14px;
#     border: 1px solid #ddd;
#     text-align: left;
# }

# th {
#     background-color: #1e293b;
#     color: white;
# }

# /* Table hover effect */
# tbody tr:hover {
#     background-color: #f1f5f9;
# }

# /* Footer */
# footer {
#     background-color: #1e293b;
#     color: white;
#     text-align: center;
#     padding: 20px;
#     margin-top: 50px;
# }


# 5. Add JavaScript
# File: static/js/script.js
# // Execute JavaScript after the HTML document has loaded.
# document.addEventListener("DOMContentLoaded", function () {

#     // Find all employee table rows.
#     const rows = document.querySelectorAll("tbody tr");

#     console.log("Employee Management System Loaded");

#     // Display the number of employee rows in the browser console.
#     console.log("Total rows:", rows.length);

# });


# This is a basic example to verify that our external JavaScript file is working.
# 6. Update Navbar
# File: templates/includes/navbar.html
# <nav>

#     <h2>Employee Management</h2>

#     <ul>

#         <!-- Generate URLs using Django URL names -->
#         <li>
#             <a href="{% url 'home' %}">Home</a>
#         </li>

#         <li>
#             <a href="{% url 'about' %}">About</a>
#         </li>

#     </ul>

# </nav>


# 7. Update Home Page
# File: templates/employees/home.html
# {% extends 'base.html' %}

# {% block title %}
#     Home | Employee Management
# {% endblock %}

# {% block content %}

#     <h1>Employee Management System</h1>

#     <p>Manage your employee records efficiently.</p>

#     <h2>Employee List</h2>

#     <table>

#         <thead>
#             <tr>
#                 <th>ID</th>
#                 <th>Name</th>
#                 <th>Department</th>
#             </tr>
#         </thead>

#         <tbody>

#             {% for employee in employees %}

#                 <tr>
#                     <td>{{ employee.id }}</td>
#                     <td>{{ employee.name }}</td>
#                     <td>{{ employee.department }}</td>
#                 </tr>

#             {% empty %}

#                 <tr>
#                     <td colspan="3">No employees found.</td>
#                 </tr>

#             {% endfor %}

#         </tbody>

#     </table>

# {% endblock %}


# 8. Run and Test
# Start your server:
# python manage.py runserver


# Open:

# http://127.0.0.1:8000/

# You should now see:
# - Dark navigation bar.
# - Styled employee table.
# - Improved spacing and typography.
# - Footer at the bottom.
# Step 12 completed
# 9. Important Commands
# # Check Django configuration
# python manage.py check

# # Collect static files for deployment
# python manage.py collectstatic


# collectstatic copies static assets from configured static directories into STATIC_ROOT. You generally don't need to run it during ordinary local development.
# 10. Practical Tasks
# - [ ] Add a logo inside static/images/.
# - [ ] Display the logo in the navbar.
# - [ ] Create a separate about.css only if needed; otherwise reuse style.css.
# - [ ] Add a button to the employee page.
# - [ ] Use JavaScript to display an alert when that button is clicked.
# - [ ] Make the navbar responsive using CSS media queries.

# Django Learning Roadmap
# Step	Topic	Status
# 1	Installation and project setup	Completed
# 2	Create Django app	Completed
# 3	Views and URL routing	Completed
# 4	Dynamic URL parameters	Completed
# 5	Templates	Completed
# 6	Template inheritance	Completed
# 7	Static files	Completed
# 8	Django Models and Database	Next

# Next Step 13: Django Models and Database Integration

# We'll start actual backend development:
# 1. Understand Django ORM.
# 2. Create Employee model.
# 3. Define fields and data types.
# 4. Understand primary keys.
# 5. Perform migrations.
# 6. Insert and retrieve database records.
# This is where we'll move from sample Python dictionaries to actual database-driven employee records.