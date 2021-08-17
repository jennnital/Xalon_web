<template>
  <div
    :key="homeKey"
    class="home">
    intro scene goes here
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'

  export default {
    name: 'Home',
    components: {
    },
    data () {
      return {
        showModal: false,
        camera: {'x':-350,'y':150,'z':250},
        homeKey: 0,
        representationKey: 2,
        inverse: false,
        loaded: false
      }
    },
    computed: {
      ...mapGetters(['isMobile'])
    },
    created () {
      window.addEventListener('resize', this.onWindowResize)
      if ( window.innerHeight > window.innerWidth ) {
        this.inverse = true
      }
    },
    destroyed () {
      window.removeEventListener('resize', this.onWindowResize)
    },
    methods: {
      ...mapActions([]),
      onWindowResize () {
        window.location.reload()
      },
      handleGalleryLoaded () {
        this.loaded = true
      },
      handleCameraChange (camera) {
        camera.x = Math.round(camera.x)
        camera.y = Math.round(camera.y)
        camera.z = Math.round(camera.z)
        
        this.camera = camera
      }
    }
  }
</script>

<style scoped>

.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b2c2d;
  color: #d0d0d0;
  font-size: 2rem;
}

#gallery {
  background: #2b2c2d;
  width: 100%;
  height: 100%;
  border-right: solid 1px #d0d0d0;
}

@media only screen and (max-width: 700px) {
}

</style>
