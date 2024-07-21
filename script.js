document.addEventListener("DOMContentLoaded", function () {
    // Initialisation de Supabase
    const supabaseUrl = 'https://kxjoxxencuxjhpdhbpkn.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4am94eGVuY3V4amhwZGhicGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMTg1NDIsImV4cCI6MjAzNjg5NDU0Mn0.gLAwFc4Lj3YZPqeBdrv9eN_96cOYrXVkq7r9rBdjmVk';
    
    
    // Créez le client Supabase
    const { createClient } = supabase; // Assurez-vous que 'createClient' est bien importé
    const database = createClient(supabaseUrl, supabaseKey);

    const inscriptionForm = document.getElementById('inscriptionForm');
    const connexionForm = document.getElementById('connexionForm');
    const ajoutProduitForm = document.getElementById('ajoutProduitForm');

    // Validation des champs et affichage du champ suivant
    function validateField(field, errorElement, isValidCondition, errorMessage) {
        if (field && !isValidCondition) {
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
            field.classList.remove('valid');
            field.classList.add('invalid');
            return false;
        } else if (field) {
            if (errorElement) {
                errorElement.textContent = '';
            }
            field.classList.remove('invalid');
            field.classList.add('valid');
            return true;
        }
    }

    // // Gestion de l'inscription
    // async function signUp(email, password) {
    //     const { user, error } = await supabase.auth.signUp({ email, password });
    //     if (error) {
    //         console.error('Erreur lors de l\'inscription:', error.message);
    //         alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    //     } else {
    //         alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    //         inscriptionForm.classList.add('hidden');
    //         connexionForm.classList.remove('hidden');
    //     }
    // }

    // // Gestion de la connexion
    // async function signIn(email, password) {
    //     const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    //     if (error) {
    //         console.error('Erreur lors de la connexion:', error.message);
    //         document.getElementById('loginEmailError').textContent = 'Identifiant ou mot de passe incorrect.';
    //         document.getElementById('loginPasswordError').textContent = 'Identifiant ou mot de passe incorrect.';
    //     } else {
    //         connexionForm.classList.add('hidden');
    //         ajoutProduitForm.classList.remove('hidden');
    //     }
    // }

    // Gestion de la déconnexion
    async function signOut() {
        const { error } = await database.auth.signOut();
        if (error) {
            console.error('Erreur lors de la déconnexion:', error.message);
        } else {
            ajoutProduitForm.classList.add('hidden');
            connexionForm.classList.remove('hidden');
        }
    }

    // // // Gestion des changements d'état de connexion
    // supabase.auth.onAuthStateChange((event, session) => {
    //     if (event === 'SIGNED_IN') {
    //         ajoutProduitForm.classList.remove('hidden');
    //         connexionForm.classList.add('hidden');
    //     } else if (event === 'SIGNED_OUT') {
    //         ajoutProduitForm.classList.add('hidden');
    //         connexionForm.classList.remove('hidden');
    //     }
    // });

    // Écouteurs d'événements pour les formulaires

    // Formulaire d'Inscription
    if (inscriptionForm) {
        inscriptionForm.addEventListener('input', function (event) {
            const target = event.target;
            switch (target.id) {
                case 'prenom':
                    validateField(target, document.getElementById('prenomError'), target.value.length >= 3 && target.value.length <= 15, 'Le prénom doit contenir entre 3 et 15 caractères.');
                    break;
                case 'nom':
                    validateField(target, document.getElementById('nomError'), target.value.length >= 3 && target.value.length <= 15, 'Le nom doit contenir entre 3 et 15 caractères.');
                    break;
                case 'email':
                    validateField(target, document.getElementById('emailError'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value), 'Veuillez entrer une adresse email valide.');
                    break;
                case 'password':
                    validateField(target, document.getElementById('passwordError'), /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(target.value), 'Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial.');
                    break;
            }
        });

        inscriptionForm.addEventListener('submit', function (event) {
            event.preventDefault();

                 //ajout d'un utilisateur
               // Gestion de l'inscription

             async function signUp(email, password) {
                const {data: user, error } = await database.auth.signUp({ 
                    email: inscriptionForm.email.value, 
                    password:inscriptionForm.password.value });
                if (error) {
                    console.error('Erreur lors de l\'inscription:', error.message);
                    alert('Erreur lors de l\'inscription. Veuillez réessayer.');
                    inscriptionForm.classList.add('hidden');
                    connexionForm.classList.remove('hidden');
                } else {
                    alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                    
                    
                }
            }



            const isValidPrenom = validateField(document.getElementById('prenom'), document.getElementById('prenomError'), document.getElementById('prenom').value.length >= 3 && document.getElementById('prenom').value.length <= 15, 'Le prénom doit contenir entre 3 et 15 caractères.');
            const isValidNom = validateField(document.getElementById('nom'), document.getElementById('nomError'), document.getElementById('nom').value.length >= 3 && document.getElementById('nom').value.length <= 15, 'Le nom doit contenir entre 3 et 15 caractères.');
            const isValidEmail = validateField(document.getElementById('email'), document.getElementById('emailError'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value), 'Veuillez entrer une adresse email valide.');
            const isValidPassword = validateField(document.getElementById('password'), document.getElementById('passwordError'), /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(document.getElementById('password').value), 'Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial.');

            if (isValidPrenom && isValidNom && isValidEmail && isValidPassword) {
                signUp(document.getElementById('email').value, document.getElementById('password').value);
            }

           

        });
    }
    const emailConnexion = document.getElementById('login-email').value;
    const passwordConnexion = document.getElementById('login-password').value;
    // Formulaire de Connexion
    if (connexionForm) {
        
        connexionForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // const emailConnexion = document.getElementById('login-email').value;
            // const passwordConnexion = document.getElementById('login-password').value;

            // Validation basique (à remplacer par une authentification réelle)
            if (emailConnexion && passwordConnexion) {
                signIn(emailConnexion, passwordConnexion);
            } else {
                document.getElementById('loginEmailError').textContent = 'Identifiant ou mot de passe incorrect.';
                document.getElementById('loginPasswordError').textContent = 'Identifiant ou mot de passe incorrect.';
            }
        });
    }
        // // Gestion de la connexion
        if (connexionForm) {
            connexionForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                if (connexionForm.email && connexionForm.password &&
                    validEmail(connexionForm.email) && validPassword(connexionForm.password)) {
                    try {
                        const { data: { user }, error } = await database.auth.signInWithPassword({
                            email: connexionForm.email.value,
                            password: connexionForm.password.value,
                        });
                        if (error) throw error;
                        alert("Connexion réussie !");
                        window.location.href = 'index.html';
                        // Redirection ou autres actions après connexion réussie
                    } catch (error) {
                        alert("Erreur lors de la connexion : " + error.message);
                    }
                }
            });
        }

    // Formulaire d'ajout de Produit
    if (ajoutProduitForm) {
        ajoutProduitForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const productName = document.getElementById('product-name').value;
            const productPrice = document.getElementById('product-price').value;
            const productQuantity = document.getElementById('product-quantity').value;

            if (productName && productPrice && productQuantity) {
                ajoutProduitForm.reset();
                alert('Produit ajouté avec succès');
                // Fonctionnalité supplémentaire pour gérer la liste des produits peut être ajoutée ici
            }
        });
    }
});
