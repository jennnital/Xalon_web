<template>
  <div>
    <div
      v-if="showAbout"
      class="aboutHolder">
      <div
        class="about"
        @click="toggleShowAbout">
        welcome to the xalon
        <br><br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed feugiat velit. Maecenas a commodo odio. Duis faucibus turpis et odio sollicitudin tincidunt. Curabitur id ligula turpis. Proin cursus dui a metus rutrum gravida. Morbi vitae metus viverra, dignissim odio at, mollis justo. Vestibulum tincidunt dictum purus non efficitur. In nisl dolor, congue ut ante eu, laoreet tincidunt velit. Aliquam erat volutpat. In eu mattis nunc. Suspendisse magna elit, ultrices sit amet venenatis vel, porta vel erat.
        <br><br>
        Etiam quis ornare augue. Suspendisse consectetur odio vel dui viverra ultricies eu non leo. Proin lacinia sodales tellus, in dictum elit blandit vel. Vivamus dignissim nisi nulla, at volutpat metus sodales ac. Morbi eget sem non est bibendum bibendum. Praesent finibus finibus dui non hendrerit. Curabitur finibus eleifend sapien nec dignissim. Vestibulum tempus in elit in dictum. Donec nisi ante, suscipit et tellus quis, fermentum scelerisque neque. Maecenas quis velit porta, blandit urna efficitur, pharetra mauris.
        <br><br>
        Vivamus eu nibh vulputate, fermentum augue sit amet, fermentum arcu. Nulla facilisi. Nam mattis placerat velit, eu laoreet elit gravida ut. Morbi vitae metus dolor. Fusce consectetur enim quis turpis vehicula iaculis. Morbi mattis massa pretium, dignissim turpis ut, placerat felis. Suspendisse cursus, massa in vulputate interdum, odio metus malesuada diam, id rhoncus metus mi a erat. Cras hendrerit dui at nisi pellentesque pretium. Duis tortor sem, luctus ut scelerisque non, ultrices in mi. Sed fringilla neque ut finibus bibendum. Fusce id est maximus, gravida odio in, dapibus nunc. In ultrices placerat commodo.
      </div>
    </div>
    <div
      id="galleryScene">
      <video
        id="video"
        style="display:none"
        autoplay
        playsinline />
    </div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  // import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

  export default {
    name: 'Gallery',
    data () {
      return {
        video: null,
        camera: null,
        scene: null,
        group: null,
        renderer: null,
        mesh: null,
        controls: null,
        loaded: true,
        progress: 0,
        selectedObject: null,
        raycaster: null,
        pointer: {},
        showAbout: true
      }
    },
    computed: {
      box () {
        let box = {}
        box.height = document.getElementById('galleryScene').clientHeight
        box.width = document.getElementById('galleryScene').clientWidth
        return box
      }
    },
    created () {
      window.addEventListener('resize', this.onWindowResize)
    },
    destroyed () {
      window.removeEventListener('resize', this.onWindowResize)
    },
    mounted () {
      this.init()
      this.animate()
    },
    methods: {
      toggleShowAbout () {
        this.showAbout = !this.showAbout
      },
      onWindowResize () {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( window.innerWidth, window.innerHeight )
      },
      delayStart () {
        this.loaded = true
        this.$emit('loaded')
        this.startAnimation()
      },
      onCameraChange (evt) {
        var control = evt.target 
        this.$emit('cameraChange', control.object.position)
      },
      setProgress (progress) {
        this.progress = progress
      },
      onPointerMove ( event ) {

        if ( this.selectedObject ) {

          // this.selectedObject.material.color.set( '#d0d0d0' )
          this.selectedObject.material.opacity = .8
          this.selectedObject = null

        }

        this.pointer.x = ( event.clientX / this.box.width ) * 2 - 1
        this.pointer.y = - ( event.clientY / this.box.height ) * 2 + 1

        this.raycaster.setFromCamera( this.pointer, this.camera )

        const intersects = this.raycaster.intersectObject( this.group, true )

        if ( intersects.length > 0 ) {

          const res = intersects.filter( function ( res ) {

            return res && res.object

          } )[ 0 ]

          if ( res && res.object ) {

            this.selectedObject = res.object
            // this.selectedObject.material.color.set( 0x63BFCF )
            this.selectedObject.material.opacity = 1

          }

        }

      },
      init () {

        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 )
        this.camera.position.z = 0.01

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color('#d0d0d0')

        // raycaster/pointer breaks on wondow resize
        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()

        document.addEventListener( 'pointermove', this.onPointerMove )

        this.video = document.getElementById('video')

        const texture = new THREE.VideoTexture( this.video )

        const geometry = new THREE.PlaneGeometry( 16, 9 )
        geometry.scale( 0.5, 0.5, 0.5 )
        const material = new THREE.MeshBasicMaterial( { map: texture } )

        let count = 1024
        let radius = 40

        for ( let i = 1, l = count; i <= l; i ++ ) {

          const phi = Math.acos( - 1 + ( 2 * i ) / l )
          const theta = Math.sqrt( l * Math.PI ) * phi

          const mesh = new THREE.Mesh( geometry, material )
          mesh.position.setFromSphericalCoords( radius, phi, theta )
          // JENN - add this line back to make the outer sphere surround the camera
          // mesh.lookAt( this.camera.position)
          this.scene.add( mesh )

        }

        // create selectable group
        this.group = new THREE.Group()

        count = 24
        radius = 15

        for ( let i = 1, l = count; i <= l; i ++ ) {

          const phi = Math.acos( - 1 + ( 2 * i ) / l )
          const theta = Math.sqrt( l * Math.PI ) * phi

          let material = new THREE.MeshStandardMaterial({ opacity: .75, transparent: true })
          const mesh = new THREE.Mesh( geometry, material )
          mesh.position.setFromSphericalCoords( radius, phi, theta )
          mesh.lookAt( this.camera.position )
          this.group.add( mesh )

        }

        this.scene.add( this.group )

        this.renderer = new THREE.WebGLRenderer( { antialias: true } )
        this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        document.getElementById('galleryScene').appendChild( this.renderer.domElement )

        const controls = new OrbitControls( this.camera, this.renderer.domElement )
        controls.enableZoom = false
        controls.enablePan = false

        //

        if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

          const constraints = { video: { width: 1280, height: 720, facingMode: 'user' } }

          navigator.mediaDevices.getUserMedia( constraints ).then( (stream) => {

            // apply the stream to the video element used in the texture

            this.video.srcObject = stream
            this.video.play()

          } ).catch( function ( error ) {

            console.error( 'Unable to access the camera/webcam.', error )

          } )

        } else {

          console.error( 'MediaDevices interface not available.' )

        }

        // ---------------------------------------------------------------------
      },
      animate () {
        requestAnimationFrame( this.animate )
        this.renderer.render( this.scene, this.camera )
      },
      startAnimation () {
        this.animate()
        this.renderer.render(this.scene, this.camera)
      }
    }
  }
</script>

<style scoped>
.loading {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
  justify-content: center;
	flex-wrap: wrap;
  background: #2b2c2d;
}

.progress-bar {
	height: 2px;
	width: 100px;
	background: #d0d0d0;
  transition: all .1s linear;
}

.progress {
  color: #d0d0d0;
}

.aboutHolder {
  position: absolute;
  top: 0;
  left: 0;
	height: 100%;
	width: 100%;
  background: #2b2c2daa;
  padding: 10rem;

  display: flex;
	align-items: center;
  justify-content: center;

  color: #fafafa;
  font-size: 2rem;
  text-align: center;
}

.about {
  max-width: 800px;
}

#galleryScene {
	width: 100%;
	height: 100%;
}

#container {
	width: 100%;
	height: 100%;
	opacity: 0;
}

#container.loaded {
	opacity: 1;
  transition: opacity .4s ease-out;
}

</style>
