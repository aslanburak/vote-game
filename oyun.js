var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Resimler
var sndk = new Image();
var oy1 = new Image();
var oy2 = new Image();
var oy3 = new Image();
var ark = new Image();

ark.src = "images/ark.jpg";
sndk.src = "images/sndk.png";
oy1.src = "images/oy1.png";
oy2.src = "images/oy2.png";
oy3.src = "images/oy3.png";

//Sesler
var yes= new Audio();
var no= new Audio();
var invalid= new Audio();
yes.src="sounds/yes.mp3";
no.src="sounds/no.mp3";
invalid.src="sounds/invalid.mp3";



var bx = 350;  //Sandık x birim uzaklığı
var by = 390;  // Sandık y birim uzaklığı
var canvasWidth = cvs.width;
var canvasHeight=cvs.height;
var tx = 0;
var ty = 0;
var evetSkor = 0;
var hayirSkor = 0;
var oyunBitti = false;
//Resim dosyalarını boyutlandırdık
var oywidth=90;
var oyheight=180;
var sndkwidth=134;
var sndkheight=101;

var kurallarResmi = new Image();
kurallarResmi.src = "images/kural.jpg";

    var startScreen = document.getElementById("startScreen"); //Griş ekranı
    var kurallarButton = document.getElementById("kurallarButton");
    kurallarButton.style.position = "absolute";
    kurallarButton.style.top = "0";
    kurallarButton.style.left = "0";
    //kurallar butonuna tıkladığımızda drawKurallar fonksiyonunu çalıştırır
    kurallarButton.addEventListener("click", function() {
      drawKurallar();
    });

    function drawKurallar() {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(kurallarResmi, 0, 0, canvasWidth, cvs.height);
      }

    //Oyuna başla butonu
    var startButton = document.getElementById("startButton");
    startButton.addEventListener("click", function() {
      startGame();
    });
    //Yeniden oyna butonu
    var restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", function() {
      restartGame();
    });

    
//Video anlatım butonu
var videoAnlatimButton = document.getElementById("videoAnlatimButton");
videoAnlatimButton.style.position = "absolute";
videoAnlatimButton.style.top = "0";
videoAnlatimButton.style.right = "0";
// Butona tıklandığında videoyu açacak fonksiyonu tanımladık
videoAnlatimButton.addEventListener("click", function() {
  // YouTube videosunun URL'si
  var videoURL = "https://youtu.be/UGj2gOoVyiY"; // VIDEO_ID'yi gerçek video kimliğiyle değiştirin

  // YouTube videosunun açılması için yeni bir sekme açılacak
  window.open(videoURL, "_blank");
});

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
          // Sol tuşa basıldığında, sandık resmini sola hareket ettirir
          if (bx > 0)
            bx -= 10; // İstediğiniz hızda hareket etmesini sağlamak için değeri ayarlayabilirsiniz
        } else if (event.key === "ArrowRight") {
          // Sağ tuşa basıldığında, sandık resmini sağa hareket ettir
          if (bx < cvs.width - sndkwidth)
            bx += 10;
        }
      });
      
//Oyuna başlama kısmı 
function startGame() {

  startButton.style.display = "none";     // Başlatma butonunu gizle
  kurallarButton.style.display = "none"; // Nasıl oynanır butonunu gizle
  restartButton.style.display = "none"; //Yeniden Oyna butonunu gizle
  videoAnlatimButton.style.display = "none"; //Video anlatım butonunu gizler

 //Çizim fonksiyonu
  function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(ark, 0, 0, 900, 563); //Arka plan çizildi
    ctx.drawImage(sndk,bx,by,sndkwidth,sndkheight);//Sandık çizildi  
  
    // Yes oyu çizdiriliyor
    for(var i=0; i< evt.length;i++){
      ctx.drawImage(oy1,evt[i].x,evt[i].y,oywidth,oyheight);
      evt[i].y+=2;
  
  
      if( evt[i].y == 300 ){ //"Yes" oyu 300 birim uzaklıktan sonra yeniden çağırılacak
        evt.push({
            x : Math.random()*canvasWidth-100,
            y : 0
        }); 
    }
     // "YES" oyunun sandığa çarpıp çarpmaması kontrol ediliyor
     if (checkCollision(evt[i].x,evt[i].y, oywidth, oyheight, bx, by, sndkwidth, sndkheight)) {
      evetSkor++;
      yes.play(); //Yes oyu sandığa çarpınca çalacak ses dosyası
      resetOy1();
    }
    function resetOy1() {
      evt[i].y = -100;
      evt[i].x= Math.random() * (canvasWidth-oywidth);
    }
    } 
  // "NO" oyu çizdiriliyor
    for(var i=0; i< hyr.length;i++){
      ctx.drawImage(oy2,hyr[i].x,hyr[i].y,90,180);
      hyr[i].y+=2;
  
   //"NO" oyu 300 birim uzaklıktan sonra yeniden çağırılacak
      if( hyr[i].y == 300 ){
        hyr.push({
            x : Math.random()*(canvasWidth-oywidth),
            y : 0
        }); 
    }
    //"No" oyu sandığa çarpmasını kontrol ediyoruz
    if (checkCollision(hyr[i].x,hyr[i].y, oywidth, oyheight, bx, by, sndkwidth, sndkheight)) {
      hayirSkor++;
      no.play(); //No oyu sandığa çarpınca çalacak ses dosyası
      resetOy2();
    }
  
    function resetOy2() {
      hyr[i].y = -100;
      hyr[i].x = Math.random() * (canvasWidth - oywidth);
    }
    
    }
    // "Geçersiz" oyu çiziyoruz
    for(var i=0; i< invd.length;i++){
      ctx.drawImage(oy3,invd[i].x,invd[i].y,90,180);
      invd[i].y+=2;
  
  // "Geçersiz" oyu 250 birim uzunluğu geçtikten sonra tekrar çağırılır
      if( invd[i].y == 250 ){
          invd.push({
            x : Math.random()*(canvasWidth-oywidth),
            y : 0
        }); 
    }
    // "Geçersiz" oy sandığa çarpmasını kontrol ediyoruz
    if (checkCollision(invd[i].x,invd[i].y, oywidth, oyheight, bx, by, sndkwidth, sndkheight)) {
        
      oyunBitti = true;
      invalid.play();
      resetOy3(i);
    }
  
    }
    //Puanlamanın ekrana yazıldığı kısım
    ctx.fillStyle = "#fff"; 
    ctx.font = "25px Verdana";
    ctx.fillText("Yes: " + evetSkor, 10, cvs.height - 50);
    ctx.fillText("NO: " + hayirSkor, 10, cvs.height - 20);

  // oyun bittiğinde ekrana yazdırılacak yazı
    if (oyunBitti) { 
      ctx.fillStyle = "#fff"; 
      ctx.font = "30px Verdana";
      ctx.fillText("VOTING IS OVER!", cvs.width / 2 - 80, cvs.height / 3 - 10);
      ctx.fillText("YES: " + evetSkor +" VOTE", cvs.width / 2 - 80, cvs.height / 3 + 30);
      ctx.fillText("NO: " + hayirSkor + " VOTE", cvs.width / 2 - 80, cvs.height / 3 + 70);
      restartButton.style.display = "block";
      kurallarButton.style.display = "block"; 
      videoAnlatimButton.style.display = "block";

    } else {
      requestAnimationFrame(draw);
    }
  }
  function resetOy3(index) {
    invd.splice(index, 1); // "Oy3" resmini diziden kaldırılması
  }
  

  draw(); // Oyun döngüsünü başlat
}

//Oyuna tekrar başlama fonksiyonu
function restartGame() {
    evetSkor = 0;
    hayirSkor = 0;
    oyunBitti = false;
    bx = 350;
    by = 390;
    restartButton.style.display = "none";
    
    startGame(); 

    invd.push({
        x: Math.random() * (canvasWidth - oywidth),
        y: 0
      });  
  }

var evt= [];
evt[0]={
  x: Math.random()*canvasWidth,
  y: 0

};
var hyr= [];
hyr[0]={
  x: Math.random()*canvasWidth,
  y: 0

};

var invd= [];
invd[0]={
  x: Math.random()*canvasWidth,
  y: 0

};


//Oyların sandığa çarpıp çarmadığını kontrol eden fonksiyon
function checkCollision(x1, y1, oywidth, oyheight, x2, y2, sndkwidth, sndkheight) {
  if (
    x1+90 < x2 + sndkwidth &&
    x1 + oywidth > x2+70 &&
    y1-30 < y2 + sndkheight/2-200 &&
    y1-30 + oyheight > y2
  ) {
    return true;
  }
  return false;
}


draw();