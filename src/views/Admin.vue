<template>
    <v-layout class="text-sm-center mt-3" justify-center>
        <v-flex sm6>
            <v-card v-if="user">
                <v-card-text>
                    <v-avatar>
                        <img :src="user.photo" :alt="user.name">
                    </v-avatar>
                </v-card-text>
                <v-card-text>
                    <h3>{{ user.name }}</h3>
                </v-card-text>
                <v-card-text>
                    <input type="file" ref="boton" class="d-none" @change="searchImage($event)">
                    <v-btn class="primary mr-2" @click="$refs.boton.click()">Buscar imagen</v-btn>
                    <v-btn :loading="loading" class="secundary" :disabled="file === null" @click="uploadImage()">Subir imagen</v-btn>
                </v-card-text>

                <v-card-text v-if="error">
                    <h4>{{ error }}</h4>
                </v-card-text>

                <v-card-text v-if="file">
                    <h4>{{ file.name }}</h4>
                    <v-img :src="urlImage"></v-img>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { db, firebase, storage } from '@/firebase'
export default {
    name: 'Admin',
    data() {
        return {
            file: null,
            urlImage: '',
            loading: false,
            error: null 
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        searchImage(event) {
            const type_img = event.target.files[0].type

            if(type_img === 'image/jpeg' || type_img === 'image/png'){
                this.file = event.target.files[0]
                this.error = null
                // console.log(event.target.files[0])
            }else{
                this.error = 'Archivo no váido'
                this.file = null
                return  
            }

            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e) => {
                console.log(e.target.result)
                this.urlImage = e.target.result;
            }
        },
        async uploadImage(){

            try {
                this.loading = true
                const refImage = storage.ref().child(this.user.email).child('photo perfil')
                const res = await refImage.put(this.file)
                console.log(res)    
                const urlDownload = await refImage.getDownloadURL()
                console.log(urlDownload)
                this.user.photo = urlDownload;

                await db.collection('users').doc(this.user.uid).update({
                    photo: urlDownload
                })

                this.error = 'Imagen subida con éxito'
                this.file = null
            } catch (error) {
                console.log(error);
            }finally{
                this.loading = false
            }
        }
    }
}
</script>

<style>

</style>