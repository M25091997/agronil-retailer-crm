<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AGRINOSTAR</title>
        @include('website.components.header')
        <style>
        </style>
    </head>

    <body>
        @include('website.components.navbar')
        <section class="section">
            <img src="{{ asset('website/images/aboutbanner.webp') }}" alt="Agriculture Image" />
            <div class="section-content">
                <div class="subtitle">Welcome to Agrinostar</div>
                <div class="title">Empowering Sustainable Agriculture</div>
                <p class="highlight">
                    Agrinostar brings smart, eco-friendly solutions to boost your crop health and productivity naturally.
                </p>
                <p class="description">
                    We specialize in high-performance agricultural inputs like bio-fertilizers, organic pesticides, and
                    advanced crop care products like <strong>Protector</strong>. Trusted by thousands of farmers,
                    Agrinostar is committed to transforming agriculture with innovation and integrity.
                </p>
                <ul class="check-list">
                    <li>Organic & residue-free crop protection</li>
                    <li>Eco-safe solutions with global certifications</li>
                    <li>Improved yield & soil sustainability</li>
                </ul>
                <a href="#" class="download-app">📱 Download App</a>
            </div>
        </section>
        <section class="timeline-section">
            <div class="timeline-intro">
                <h2>Agrinostar's Journey Towards Sustainable Farming</h2>
                <p>
                    From our humble beginnings to pioneering innovations, Agrinostar has remained committed to transforming
                    agriculture for a greener tomorrow.
                </p>
            </div>
            <div class="timeline-container">
                <div class="timeline-item">
                    <span class="circle"></span>
                    <h3>2005</h3>
                    <p>Company Founded</p>
                </div>
                <div class="timeline-item">
                    <span class="circle"></span>
                    <h3>2010</h3>
                    <p>Launched Organic Fertilizers</p>
                </div>
                <div class="timeline-item">
                    <span class="circle"></span>
                    <h3>2015</h3>
                    <p>Expanded to PAN India</p>
                </div>
                <div class="timeline-item">
                    <span class="circle"></span>
                    <h3>2020</h3>
                    <p>Introduced AgroTech Solutions</p>
                </div>
                <div class="timeline-item">
                    <span class="circle"></span>
                    <h3>2025</h3>
                    <p>Trusted by 10,000+ Farmers</p>
                </div>
            </div>
        </section>
        <section>
            <div class="container">
                <div class="card-container">
                    <h2 class="section-title mb-5">Meet Our Team</h2>
                    <div class="row d-flex align-items-center justify-content-center">
                        <div class="col-md-3">
                            <div class="profile-card">
                                <img src="{{ asset('website/images/profile.webp') }}" alt="Profile Image"
                                    class="profile-image">
                                <div class="profile-overlay">
                                    <h2>Aarav</h2>
                                    <p class="designation">Founder</p>
                                    <div class="social-icons">
                                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                                        <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                                        <a href="#"><i class="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="profile-card">
                                <img src="{{ asset('website/images/profile2.webp') }}" alt="Profile Image"
                                    class="profile-image">
                                <div class="profile-overlay">
                                    <h2>Aahana</h2>
                                    <p class="designation">Co Founder</p>
                                    <div class="social-icons">
                                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                                        <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                                        <a href="#"><i class="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="profile-card">
                                <img src="{{ asset('website/images/profile.webp') }}" alt="Profile Image"
                                    class="profile-image">
                                <div class="profile-overlay">
                                    <h2>Aahana</h2>
                                    <p class="designation">Co Founder</p>
                                    <div class="social-icons">
                                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                                        <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                                        <a href="#"><i class="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="partner-logos">
            <div class="container">
                <div class="logo-slider">
                    <div class="owl-carousel owl-theme partner">
                        <div class="item">
                            <img src="{{ asset('website/images/partner1.png') }}" alt="Health">
                        </div>
                        <div class="item">
                            <img src="{{ asset('website/images/partner2.png') }}" alt="Health">
                        </div>
                        <div class="item">
                            <img src="{{ asset('website/images/partner3.png') }}" alt="Health">
                        </div>
                        <div class="item">
                            <img src="{{ asset('website/images/partner2.png') }}" alt="Health">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        @include('website.components.footer')
        @include('website.components.vendor')
    </body>

</html>
