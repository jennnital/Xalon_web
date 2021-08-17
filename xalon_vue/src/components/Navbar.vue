<template>
  <div class="navbar">
    <h1
      class="navbar__item"
      @click="navigate('/')">
      Xalon Web
    </h1>
    <div class="navbar__links">
      <h1
        class="navbar__item nav"
        @click="navigate('/')">
        Landing
      </h1>
      <h1
        class="navbar__item nav"
        @click="navigate('/gallery')">
        Gallery
      </h1>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'

  export default {
    name: 'Navbar',
    components: {
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters([])
    },
    methods: {
      ...mapActions([]),
      navigate (refName) {
        this.$emit('navigate')
        this.$router.push(`${refName}`)
      }
    }
  }
</script>

<style scoped>

.navbar {
  position: absolute;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  background: #d0d0d0;
  border-bottom: solid 1px #2b2c2d;
}

.navbar__item {
  color: #2b2c2d;
  padding-left: 1.5rem;
  padding-right: 1rem;
  font-weight: 400;
  font-size: 1.5rem;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.navbar__item.nav:hover {
  color: #ffc0cb;
  transform: translateY(-1px);
}

.navbar__links {
  position: absolute;
  right: 0;
  padding-right: 1.5rem;
  display: flex;
}

@media only screen and (max-width: 700px) {

  .navbar {
    max-height: 0;
    opacity: 0;
  }


}

</style>
