// Todo: https://codepen.io/alenabdula/pen/ayyQOv?editors=1010
let app = new Vue({
  el: "#app",
  store: store,
  data() {
    return {
      days: [
        {day: "Tuesday",
        venues: [
          {name: "Hideout Up"},
          {name: "Hideout Down"},
          {name: "Fallout"}
        ]},
        {day: "Wednesday",
        venues: [
          {name: "Hideout Up"},
          {name: "Hideout Down"},
          {name: "Fallout"},
        ]},
        {day: "Thursday",
        venues: [
          {name: "Hideout Up"},
          {name: "Hideout Down"},
          {name: "ColdTowne"},
          {name: "Fallout"},
          {name: "Velveeta"},
        ]},
        {day: "Friday",
        venues: [
          {name: "Hideout Up"},
          {name: "Hideout Down"},
          {name: "ColdTowne"},
          {name: "Fallout"},
          {name: "Velveeta"},
        ]},
        {day: "Saturday",
        venues: [
          {name: "Hideout Classroom"},
          {name: "Hideout Up"},
          {name: "Hideout Down"},
          {name: "ColdTowne"},
          {name: "Velveeta"}
        ]},
        {day: "Sunday",
        venues: [
          {name: "Hideout Classroom"},
          {name: "Hideout Up"},
          {name: "Hideout Down"},
          {name: "Fallout"},
          {name: "Velveeta"},
          {name: "North Door"}
        ]},
        {day: "Monday",
        venues: [
          {name: "Hideout Down"}
        ]}
      ],
      editMode: true,
      hideNavigation: false
    }
  },
  methods: {
    toggleNavigation() {
      if(this.hideNavigation) {
        document.getElementById("dash-nav").style.display = 'flex';
        document.getElementsByTagName("main")[0].style["margin-left"] = '206px'
        document.getElementsByClassName('dash-toolbar')[0].style.left = '206px'
      }
      else {
        document.getElementById("dash-nav").style.display = 'none';
        document.getElementsByTagName("main")[0].style["margin-left"] = 0
        document.getElementsByClassName('dash-toolbar')[0].style.left = 0
      }
      this.hideNavigation = !this.hideNavigation
    },
  },

  created() {
    let self = this

    // Get Shows
    axios
      .get('/api/shows')
      .then(function(response) {
        self.$store.commit('setupShows', response.data)
      })
      .catch(function(error) {
        alert("Error getting shows :(")
        console.log(error)
      })

    // Get Acts
    axios
      .get('/api/acts')
      .then(function(response) {
        self.$store.commit('setupActs', response.data)
      })
      .catch(function(error) {
        alert("Error getting acts :(")
        console.log(error)
      })

    // Get Workshops
    axios
      .get('/api/workshops/')
      .then(function(response) {
        self.$store.commit('setupWorkshops', response.data)
      })
      .catch(function(error) {
        alert("Error getting workshops :(")
        console.log(error)
      })

    // Get Hosts
    axios
      .get('/api/hosts/')
      .then(function(response) {
        self.$store.commit('setupHosts', response.data)
      })
      .catch(function(error){
        alert("Error getting hosts :(")
        console.log(error)
      })
  }
})