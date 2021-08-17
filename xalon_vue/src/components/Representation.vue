<template>
  <div class="outer"> 
    <div id="camera"> 
      {{ camera }}
    </div>
    <div id="canvas" /> 
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import P5 from 'p5'

  export default {
    name: 'Representation',
    components: {
    },
    props: {
      camera: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        showModal: false
      }
    },
    computed: {
      ...mapGetters([])
    },
    mounted () {
      const script = (p5) => {

        // set up p5
        p5.setup = () => {
          let height = document.getElementById('canvas').clientHeight
          let width = document.getElementById('canvas').clientWidth
          p5.createCanvas(width,height)
          p5.noStroke()
          p5.rectMode(p5.CENTER)
        }

        p5.draw = () => {
          p5.background(43,44,45)

          p5.fill(99,191,207,255)
          p5.rect(p5.width / 2, p5.height / 2, p5.abs(this.camera.x) * 1.2, p5.abs(this.camera.x) * 1.2)
          p5.fill(35,169,127,255)
          p5.rect(p5.width / 2, p5.height / 2, p5.abs(this.camera.z) * 1.2, p5.abs(this.camera.z) * 1.2)
          p5.fill(237,191,197,255)
          p5.rect(p5.width / 2, p5.height / 2, p5.abs(this.camera.y) * 1.2, p5.abs(this.camera.y) * 1.2)
        }

      }
      new P5(script,'canvas')
    },
    methods: {
      ...mapActions([])
    }
  }
</script>

<style scoped>

.outer {
  height: 100%;
  width: 100%;
}

#camera {
  position: absolute;
  top: 5rem;
  color: #d0d0d0;
  font-weight: 400;
  font-size: 1.5rem;
}

#canvas {
  height: 100%;
  width: 100%;
}

@media only screen and (max-width: 700px) {
}

</style>
