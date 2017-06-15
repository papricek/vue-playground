<!-- src/components/Home.vue -->

  <template>
    <div class="col-sm-6 col-sm-offset-3">
      <h1>Get a Free Chuck Norris Quote!</h1>
      <button class="btn btn-primary" v-on:click="getRandomWord()">Get a Word</button>
      <button class="btn btn-primary" v-on:click="getQuote()">Get a Quote</button>

          <h2>Words</h2>
          <li v-for="item in randomWords" :key="item._id">
            <h2><blockquote> {{ item.data }}</blockquote></h2>
          </li>
      
      <h2>Quotes</h2>
      <div class="quote-area" v-if="quote">
        <h2><blockquote>{{ quote }}</blockquote></h2>
        <ul id="example-1">
          <li v-for="item in quotes" :key="item._id">
            <h2><blockquote> {{ item.data }}</blockquote></h2>
          </li>


        </ul>
      </div>
    </div>
  </template>

  <script>
  import store from '../store'

  export default {
    data() {
      return {
        quote: '',
        quotes: [],
        randomWord: '',
        randomWords: [],
        words: [
            'formidable',
            'gracious',
            'daft',
            'mundane',
            'onomatopoeia'
        ]
      }
    },
    methods: {
      getQuote() {
        this.$http
          .get('http://localhost:3001/api/random-quote', (data) => {
            this.quote = data;
            store.create('quote', data).then(results => {
              store.reloadProperty(this, 'quotes')
            })

          })
          .error((err) => console.log(err))
      },
      getRandomWord() {
        var randomIndex = Math.floor(Math.random() * this.words.length);
        this.randomWord = this.words[randomIndex];
        store.create('randomWord', this.randomWord).then(results => {
          store.reloadWords(this, 'randomWords')
        })
      }
    }
  }
  </script>
