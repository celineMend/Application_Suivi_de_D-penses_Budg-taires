document.addEventListener("DOMContentLoaded", function () {

    const supabaseUrl = 'https://kxjoxxencuxjhpdhbpkn.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4am94eGVuY3V4amhwZGhicGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMTg1NDIsImV4cCI6MjAzNjg5NDU0Mn0.gLAwFc4Lj3YZPqeBdrv9eN_96cOYrXVkq7r9rBdjmVk';
    const database = supabase.createClient(supabaseUrl, supabaseKey);

    const createCourseForm = document.getElementById('create-course-form');
    const ajoutProduitForm = document.getElementById('ajoutProduitForm');
    const coursesContainer = document.getElementById('courses-container');
    const productList = document.getElementById('product-list');
    const selectedCourseName = document.getElementById('selected-course-name');
    const selectedDate = document.getElementById('selected-date');
    let currentCourseId = null;

    // Fonction pour créer une nouvelle course
    async function createCourse(nom, description, date) {
        const { data, error } = await database
            .from('courses')
            .insert([{ nom, description, date }]);

        if (error) {
            console.error('Erreur lors de la création de la course:', error.message);
            alert('Erreur lors de la création de la course.');
        } else {
            console.log('Course créée avec succès:', data);
            alert('Course créée avec succès!');
            fetchCourses();
        }
    }

    // Fonction pour ajouter un produit à une course
    async function addProduct(nom, prix, Quantite, courseId) {
        const { data, error } = await database
            .from('produits')
            .insert([{ nom, prix, Quantite, course_id: courseId }]);

        if (error) {
            console.error('Erreur lors de l\'ajout du produit:', error.message);
            alert('Erreur lors de l\'ajout du produit.');
        } else {
            console.log('Produit ajouté avec succès:', data);
            alert('Produit ajouté avec succès!');
            fetchProducts(courseId);
        }
    }

    // Fonction pour récupérer les produits d'une course
    async function fetchProducts(courseId) {
        const { data, error } = await database
            .from('produits')
            .select('*')
            .eq('course_id', courseId);

        if (error) {
            console.error('Erreur lors de la récupération des produits:', error.message);
            alert('Erreur lors de la récupération des produits.');
        } else {
            console.log('Produits récupérés:', data);
            productList.innerHTML = '';
            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.innerHTML = `
                    <h3>${product.nom}</h3>
                    <p>Prix: ${product.prix}</p>
                    <p>Quantité: ${product.Quantite}</p>
                `;
                productList.appendChild(productElement);
            });
        }
    }

    // Fonction pour récupérer toutes les courses
    async function fetchCourses() {
        const { data, error } = await database
            .from('courses')
            .select('*');

        if (error) {
            console.error('Erreur lors de la récupération des courses:', error.message);
            alert('Erreur lors de la récupération des courses.');
        } else {
            console.log('Courses récupérées:', data);
            coursesContainer.innerHTML = '';
            data.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.innerHTML = `
                    <h2>${course.nom}</h2>
                    <p>${course.description}</p>
                    <p>Date: ${new Date(course.date).toLocaleDateString()}</p>
                    <button onclick="showAddProductForm('${course.id}', '${course.nom}', '${new Date(course.date).toLocaleDateString()}')">Ajouter Produit</button>
                    <button onclick="fetchProducts('${course.id}')">Voir Produits</button>
                `;
                coursesContainer.appendChild(courseElement);
            });
        }
    }

    // Afficher le formulaire d'ajout de produit pour une course spécifique
    window.showAddProductForm = function (courseId, courseName, courseDate) {
        ajoutProduitForm.classList.remove('hidden');
        selectedCourseName.textContent = courseName;
        selectedDate.textContent = courseDate;
        currentCourseId = courseId;
    }

    // Événement de soumission du formulaire d'ajout de produit
    ajoutProduitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nom = document.getElementById('product-name').value;
        const prix = parseFloat(document.getElementById('product-price').value);
        const Quantite = parseInt(document.getElementById('product-quantity').value);

        if (currentCourseId) {
            addProduct(nom, prix, Quantite, currentCourseId);
            ajoutProduitForm.reset();
            ajoutProduitForm.classList.add('hidden');
        } else {
            alert('Veuillez sélectionner une course pour ajouter un produit.');
        }
    });

    // Événement de soumission du formulaire de création de course
    createCourseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nom = document.getElementById('course-name').value;
        const description = document.getElementById('course-description').value;
        const date = document.getElementById('course-date').value;
        createCourse(nom, description, date);
        createCourseForm.reset();
    });

    // Initialisation - Récupérer et afficher les courses existantes
    fetchCourses();
});
