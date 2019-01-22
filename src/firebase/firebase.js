const mutation = {

    methods: {

        signInWithGoogle: function() {
            const provider = new firebase.auth.GoogleAuthProvider()
            firebaseApp.auth().signInWithRedirect(provider).then((result) => {

                

                this.user = result.user

            }).catch(err => console.log(error))
        },
        signUpWithPassword() {
            if (this.password === this.confirmPassword) {
                firebase.auth.createUserWithEmailAndPassword(this.email, this.password)
                    .then(() => this.signInWithPassword())
                    .catch((error) => { this.errorMessage = error.message });
            }
        },
        signInWithPassword() {
            return firebase.auth.signInWithEmailAndPassword(this.email, this.password)
                .then((userData) => {
                    this.onSignedIn();
                    return userData;
                })
                .catch((error) => { this.errorMessage = error.message });
        },
        signOut: function() {
            firebaseApp.auth().signOut().then(() => {
                this.user = null;
                this.$router.push('/');
            }).catch(err => console.log(error))
        },
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        }
    }

}