<template>
    <v-card>
        <v-tabs v-model="tab" background-color="primary">
            <v-tab value="one">Item One</v-tab>
            <v-tab value="two">Item Two</v-tab>
            <v-tab value="three">Item Three</v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="one"> One </v-window-item>

                <v-window-item value="two"> Two </v-window-item>

                <v-window-item value="three"> Three </v-window-item>
            </v-window>
        </v-card-text>

        <router-view></router-view>
    </v-card>
</template>

<script>
    export default {
        name: 'HomeView',
        data: () => ({
            tab: null
        })
    }
</script>
