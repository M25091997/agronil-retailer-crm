<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>

</script>
<script>
   const counters = document.querySelectorAll(".counter");
   const speed = 200; // Adjust speed
   counters.forEach(counter => {
   const updateCount = () => {
     const target = +counter.getAttribute("data-target");
     const count = +counter.innerText;
   
     const increment = target / speed;
   
     if (count < target) {
       counter.innerText = Math.ceil(count + increment);
       setTimeout(updateCount, 10);
     } else {
       counter.innerText = target;
     }
   };
   
   updateCount();
   });
</script>
<script>
   $('.partner').owlCarousel({
   loop:true,
   margin:10,
   nav:false,
   dots:false,
   autoplay:true,
   autoplayTimeout:3000,
   autoplayHoverPause:true,
   responsive:{
   0:{
   items:2
   },
   600:{
   items:4
   },
   992:{
   items:5
   },
   1000:{
   items:7
   }
   }
   })
</script>
<script>
   $('#testimonial').owlCarousel({
   loop:true,
   margin:10,
   nav:false,
   dots:false,
   autoplay:true,
   autoplayTimeout:3000,
   autoplayHoverPause:true,
   responsive:{
   0:{
   items:1
   },
   992:{
   items:1
   },
   1000:{
   items:2
   }
   }
   })
</script>
<script>
   window.onscroll = function () {
     scrollFunction();
   };
   
   function scrollFunction() {
     const myBtn = document.getElementById("myBtn");
     if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
       myBtn.style.display = "block";
     } else {
       myBtn.style.display = "none";
     }
   }
   function topFunction() {
     window.scrollTo({ top: 0, behavior: 'smooth' });
   }
   
   
         
</script>