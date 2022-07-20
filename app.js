const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('.name-song')
const avt = $('.img-song')
const namesinger = $('.name-singer')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const line = $('.progress')
const thumb = $('.image-song')
const nxtBtn = $('.btn-next')
const preBtn = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
const playlist = $('.playlist')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    song: [
        {
            name:"there's no one at all",
            singer:'Sơn Tùng M-TP',
            image: './asserts/img/img1.png',
            path: './asserts/music/b1.mp3'
            
        },
        {
            name:"Hoa hải đường",
            singer:'Rách 5tr',
            image: './asserts/img/img11.jpg',
            path: './asserts/music/b11.mp3'
            
        },
        {
            name:'Tướng quân',
            singer:'Nhật phong',
            image: './asserts/img/img2.jpg',
            path: './asserts/music/b2.mp3'
            
        },
        {
            name:'Ai mang cô đơn di',
            singer:'K-ICM ft APJ',
            image: './asserts/img/img3.jpg',
            path: './asserts/music/b3.mp3'
            
        },
       
        {
            name:'Anh nhà ở đâu thế',
            singer:' Amee',
            image: './asserts/img/img4.jpg',
            path: './asserts/music/b4.mp3'
            
        },
        {
            name:'Người lạ ơi',
            singer:'Karik, Orange, Superbrothers',
            image: './asserts/img/img5.jpg',
            path: './asserts/music/b5.mp3'
            
        },{
            name:'Muộn rồi mà sao còn',
            singer:'Sơn Tùng M-TP',
            image: './asserts/img/img6.jpg',
            path: './asserts/music/b6.mp3'
            
        },
        {
            name:'Đoạn tuyệt nàng đi',
            singer:' Phát Huy T4',
            image: './asserts/img/img7.jpg',
            path: './asserts/music/b7.mp3'
            
        },
        {
            name:'Fly way',
            singer:'TheFatRat',
            image: './asserts/img/img8.jpg',
            path: './asserts/music/b8.mp3'
            
        },
        {
            name:'never be alone',
            singer:'TheFatRat',
            image: './asserts/img/img9.jpg',
            path: './asserts/music/b9.mp3'
            
        },
        {
            name:'save me',
            singer:'Deamn',
            image: './asserts/img/img10.jpg',
            path: './asserts/music/b10.mp3'
            
        },
    ],
    render:function(){
        // tải nhạc qua
        const html = this.song.map((song, index) =>{
            return `
            <div class="item ${index === this.currentIndex ? 'active' : ''}  " data-index="${index}">
            <audio src="${song.path}"></audio>
           <img src="${song.image} " alt="">
           <div class="info-item">
            <h2 class="item-song">${song.name}</h2>
            <span>${song.singer} </span>
           </div>
           </div>
            `
        })
        playlist.innerHTML = html.join('\n')
    },
    defineProverties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.song[this.currentIndex]
                
            },
        })
    },
    getCurrentSong: function(){
        return this.song[this.currentIndex]
    },
    handleEvent: function(){
        // next vs pre
        nxtBtn.onclick = function(){
            if (_this.isRandom){
                _this.randomSong()
         
            }else{
                _this.nxtSong()
            }
            audio.play()
            _this.render()
            _this.scrollActive()
        }
        preBtn.onclick = function(){
            if (_this.isRandom){
                _this.randomSong()
         
            }else{
        
                _this.preSong()
            }
            audio.play()
            _this.render()
            _this.scrollActive()
        }
      document.onscroll = function(){
        console.log(window.screenTop)
      }
      
        const _this = this
       
        
        // play và pause
        playBtn.onclick = function(){
            if(_this.isPlaying){
                 
                audio.pause()
                
            }else{
               
                audio.play()
               
            }
            
        }
    //    đĩa quay tay
          const thumbAnimation = thumb.animate([
                {transform: 'rotate(360deg) '}
            ],{
                duration:12000,
                iterations:Infinity
            })
            thumbAnimation.pause()
        // khi nhạc chạy
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')   
            thumbAnimation.play()
        }
        // khi dừng
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing') 
            thumbAnimation.pause()  
        }
        // thanh nhạc chạy
        audio.ontimeupdate = function(){
         if (audio.duration){
            const subline = Math.floor(audio.currentTime / audio.duration * 100)
            line.value = subline
            var color = 'linear-gradient(90deg, rgb(3, 169, 244)' + line.value + '% , rgb(214, 214, 214)' + line.value+ '%)';
            line.style.background =color;
         }

        }
        // tua
        line. addEventListener('mousedown', function(){
            Timeupdate = false
        })
        line.oninput = function (e){
           const seeTime = audio.duration / 100 * e.target.value
           audio.currentTime = seeTime
        }

        // random bị click
      
        btnRandom.onclick = function(){
          _this.isRandom = !_this.isRandom
          btnRandom.classList.toggle('active', _this.isRandom)
          
        }
        // khi hết bài
        audio.onended = function(){
            if (_this.isRepeat){
                audio.play()
         
            }else{
                nxtBtn.click()
            }
        }
        playlist.onclick = function(e){
            const songElement = e.target.closest('.item:not(.active)')
           if (songElement){
            _this.currentIndex = Number(songElement.dataset.index)
            _this.loadCurrentSong()
            _this.render()
            audio.play()
           }
        }
        // repeat
        btnRepeat.onclick = function(e){
            _this.isRepeat = !_this.isRepeat
          btnRepeat.classList.toggle('active', _this.isRepeat)
        
        }
    },
    // chuyển bài đang phát ra màn hình
    scrollActive: function(){
        setTimeout(()=>{
            $('.item.active').scrollIntoView()
        }, 250)
    },
    // chuyển bài
    nxtSong: function(){
        this.currentIndex++
        if (this.currentIndex >= this.song.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    preSong: function(){
        this.currentIndex--
        if (this.currentIndex < 0){
            this.currentIndex = this.song.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong: function(){
        let newIndex
        do {
            {
                newIndex = Math.floor(Math.random() * this.song.length)
        }
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    // tải bài đầu
    loadCurrentSong :function(){
        heading.textContent = this.currentSong.name
        avt.src = this.currentSong.image
        namesinger.textContent = this.currentSong.singer
        audio.src = this.currentSong.path
    },
 
    start: function(){
        this.render()
    
       this.defineProverties()
        this.handleEvent()
        this.loadCurrentSong()
    }
}
app.start()