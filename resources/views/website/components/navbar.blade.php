 <nav class="navbar navbar-expand-lg sticky-top agronil-navbar">
     <div class="container">
         <a class="navbar-brand" href="{{ url('/') }}">Agrinostar</a>
         <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav">
             <span class="navbar-toggler-icon"></span>
         </button>
         <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNav">
             <div class="offcanvas-header">
                 <h5 class="offcanvas-title">Agrinostar</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
             </div>
             <div class="offcanvas-body">
                 <ul class="navbar-nav ms-auto">
                     <li class="nav-item">
                         <a class="nav-link active" href="{{ url('/') }}">Home</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" href="{{ url('retailer') }}">Retailers</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link download-app" href="#">📱 Download App</a>
                     </li>
                 </ul>
             </div>
         </div>
     </div>
 </nav>
