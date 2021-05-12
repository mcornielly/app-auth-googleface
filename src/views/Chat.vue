<template>
    <v-layout justify-center>
        <v-flex xs12 sm8 md6 x14>
            <v-card>
                <v-card-text>
                    <h3>Bienvenido Usuario: {{ user.name }}</h3>
                </v-card-text>
                <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
                    <div 
                    :class="item.user === user.name ? 'text-right' : 'text-left'" 
                    v-for="(item, index) in messages" :key="index">
                        <v-chip class="ma-2">
                            <v-avatar left>
                                <img :src="item.photo" :alt="item.user">
                            </v-avatar>
                            {{ item.text }}
                        </v-chip>
                        <p class="caption mr-3">{{ item.date }}</p>
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-form @submit.prevent="send(text)"
                    v-model="valid"

                    >
                        <v-text-field v-model="text" label="Escribe tu mensaje aquí"
                        required
                        :rules="messageRule"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { db } from '@/firebase'
import moment from 'moment'

export default {
    name: 'Chat',
    data(){
        return {
            text: '',
            messages: [],
            valid: false,
            messageRule: [
                v => !!v || 'Tienes que escribir un mensaje...'
            ]
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapActions(['newMessage']),
        send(message){
            if(this.valid){
                const message = {
                    text: this.text,
                    user: this.user.name,
                    photo: this.user.photo,
                    date: Date.now()
                }

                console.log(message)
                this.newMessage({message})
                console.log("Mensaje enviado: " + this.text)
                this.text = ''
            }else{
                console.log('No escribiste el mensaje')
            }
        }
    },
    created() {
        moment.locale('es');
        let ref = db.collection('chats').orderBy('message.date', 'desc').limit(10)
        ref.onSnapshot(querySnapshot => {
            this.messages  = []

            querySnapshot.forEach( doc => {
                this.messages.unshift({
                    text: doc.data().message.text,
                    user: doc.data().message.user,
                    photo: doc.data().message.photo,
                    date: moment(doc.data().message.date).format('lll'),
                })
            })

            console.log(this.messages)
        })
    }

}
</script>

<style>

</style>