let app = new Vue({
  data() {
    return {
      cardState: 1,
      state: 0,
      badge: {
        name: '',
        email: '',
        phone: '',
        quantity: 1
      },
      performerBadge: {
        name: '',
        phone: '',
        email: '',
        weekendOnly: null,
      }
    }
  },
  methods: {
    isValid() {
      return this.badge.name != '' &&
             this.badge.email != '' &&
             this.badge.phone != ''
    },
    isValidPerformer() {
      return this.performerBadge.name != '' &&
             this.performerBadge.email != '' &&
             this.performerBadge.phone != ''
    },
    validate(actions) {
      this.isValid() ? actions.enable() : actions.disable()
    },
    onChange(handler) {
      document.querySelector('#name').addEventListener('change', handler)
      document.querySelector('#email').addEventListener('change', handler)
      document.querySelector('#phone').addEventListener('change', handler)
    },
    validatePerformerBadge(actions) {
      this.isValidPerformer() ? actions.enable() : actions.disable()
    },
    onChangePerformerBadge(handler) {
      document.querySelector('#performer-name').addEventListener('change', handler)
      document.querySelector('#performer-phone').addEventListener('change', handler)
    },
    confirmPerformerEmail() {
      let self = this
      axios
        .post('https://app.oobfest.com/api/submissions/confirm-performer-email', {email: this.performerBadge.email})
        .then(function(response) {
          let isValid = response.data.valid
          if(isValid) {
            self.state+= 2
          }
          else {
            self.state++
          }
        })
        .catch(function() {
          alert("Email check failed. Please try again later. ")
        })
    }
  },
  mounted() {
    let self = this

    paypal.Button.render({
      env: 'production',
      commit: true,
      style: {
        layout: 'vertical',
        size:   'medium',
        shape:  'rect',
        color:  'gold'
      },
      funding: {
        allowed: [ paypal.FUNDING.CARD ],
        disallowed: [ paypal.FUNDING.CREDIT ]
      },
      validate: function(actions) {
        self.validate(actions)
        self.onChange(function() { self.validate(actions) })
      },
      onClick: function() {
        if(!self.isValid()) alert('Please fill in all fields')
      },
      payment: function(data, actions) {
        return actions.request
          .post('https://app.oobfest.com/api/paypal/create-badge-all-sale', self.badge)
          .then(function(response) {
            return response.id;
          })
      },
      onAuthorize: function(data, actions) {
        return actions.payment
          .get()
          .then(function(paymentData) {
            let requestData = {
              paymentId: data.paymentID,
              payerId: data.payerID,
              name: self.badge.name,
              email: self.badge.email,
              phone: self.badge.phone,
              quantity: paymentData.transactions[0].item_list.items[0].quantity
            }
            return actions.request
              .post('https://app.oobfest.com/api/paypal/execute-badge-all-sale', requestData)
              .then(function(response) {
                self.cardState++
              })
          })
      }
    }, '#paypal-button')

    paypal.Button.render({
      env: 'production',
      style: {
        layout: 'vertical',
        size:   'medium',
        shape:  'rect',
        color:  'gold'
      },
      funding: {
        allowed: [ paypal.FUNDING.CARD ],
        disallowed: [ paypal.FUNDING.CREDIT ]
      },
      validate: function(actions) {
        self.validatePerformerBadge(actions)
        self.onChangePerformerBadge(function() { self.validatePerformerBadge(actions) })
      },
      onClick: function() {
        if(!self.isValidPerformer()) alert("All fields are mandatory")
      },
      payment: function(data, actions) {
        return actions.request
          .post('https://app.oobfest.com/api/paypal/create-performer-badge-sale', self.performerBadge)
          .then(function(response) {
            return response.id;
          })
      },
      onAuthorize: function(data, actions) {
        return actions.payment
          .get()
          .then(function(paymentData) {
            let requestData = {
              paymentId: data.paymentID,
              payerId: data.payerID,
              name: self.performerBadge.name,
              email: self.performerBadge.email,
              phone: self.performerBadge.phone,
              weekendOnly: self.performerBadge.weekendOnly
            }
            return actions.request
              .post('https://app.oobfest.com/api/paypal/execute-performer-badge-sale', requestData)
              .then(function(response) {
                self.state++
              })
          })
      }
    }, '#paypal-button-2')
  }
})