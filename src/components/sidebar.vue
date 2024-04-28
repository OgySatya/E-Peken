<template>
    <div id="app">

        <div class="fixed flex z-40">

            <div class="absolute flex left-0 flex-row-reverse">

                <button @click.prevent="toggle()"
                    class="w-12 h-48 p-1 my-auto rounded text-white bg-gray-600 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300">
                    <span :class="[right ? '-rotate-90' : 'rotate-90']" class="block transform origin-center font-bold">
                        Drawer
                    </span>
                </button>


                <div ref="content"
                    class="transition-all duration-700 bg-yellow-200 overflow-hidden flex items-center justify-center"
                    :class="[open ? 'max-w-lg' : 'max-w-0']">
                    <div class="w-48 text-center font-bold text-xl">Sidebar</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: false,
        };
    },
    methods: {
        toggle() {
            this.open = !this.open;
        }
    }
};
</script>

<style>
html {
    background: #efefef;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
