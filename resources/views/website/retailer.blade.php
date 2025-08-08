<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Agrinostar</title>
        @include('website.components.header')
    </head>

    <body>
        @include('website.components.navbar')
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-container container">
                <div class="row align-items-center">
                    <div class="col-lg-6 col-md-12 mb-4 mb-lg-0">
                        <div class="hero-left">
                            <div class="hero-overlay">
                                <div class="hero-content">
                                    <span class="badge-custom">
                                        <i class="fas fa-seedling"></i> Empowering 1 Million Retailers by 2030
                                    </span>
                                    <h3>
                                        <span class="text-dark-green">Agrinostar</span> is a
                                        <span class="text-primary-hover">B2B tech platform</span><br>
                                        revolutionizing <span class="textprimary">Agri Input Supply Chains</span>
                                    </h3>
                                    <p>
                                        Helping <strong>rural retailers</strong> grow through smart
                                        <em>logistics</em>, <em>pricing</em>, and <em>digital tools</em>.
                                    </p>
                                    <a href="#" class="btn-custom">
                                        <i class="fas fa-download me-2"></i> Download App
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-12 text-center">
                        <div class="hero-right">
                            <img src="{{ asset('website/images/mobil-app.png') }}" alt="Agrinostar Mobile App"
                                class="hero-img img-fluid" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="agro-features">
            <div class="container">
                <div class="row text-center">
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="agro-feature-box">
                            <div class="icon-circle">
                                <i class="fas fa-store"></i>
                            </div>
                            <h5>One Stop Shop</h5>
                            <p>30,000+ Agri products with 3–8% efficient pricing.</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="agro-feature-box">
                            <div class="icon-circle">
                                <i class="fas fa-credit-card"></i>
                            </div>
                            <h5>Easy Credit</h5>
                            <p>No worries about credit. We’ve got you covered.</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="agro-feature-box">
                            <div class="icon-circle">
                                <i class="fas fa-truck"></i>
                            </div>
                            <h5>Doorstep Delivery</h5>
                            <p>PAN India delivery network to 2,700+ cities.</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="agro-feature-box">
                            <div class="icon-circle">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h5>Market Intelligence</h5>
                            <p>Get price alerts & high margin product tips.</p>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <a href="#" class="btn-custom">
                        <i class="fas fa-download me-2"></i> Download App
                    </a>
                </div>
            </div>
        </section>
        <section class="agro-counter-section">
            <div class="container text-center">
                <h2 class="section-title mb-5 text-white">Our Numbers Speak for Us</h2>
                <div class="row">
                    <div class="col-6 col-md-6 col-lg-3 mb-4">
                        <div class="counter-box">
                            <i class="fas fa-seedling icon"></i>
                            <div class="counter" data-target="60000">0</div>
                            <p>Products</p>
                        </div>
                    </div>
                    <div class="col-6 col-md-6 col-lg-3 mb-4">
                        <div class="counter-box">
                            <i class="fas fa-map-marked-alt icon"></i>
                            <div class="counter" data-target="2700">0</div>
                            <p>Cities Reached</p>
                        </div>
                    </div>
                    <div class="col-6 col-md-6 col-lg-3 mb-4">
                        <div class="counter-box">
                            <i class="fas fa-truck icon"></i>
                            <div class="counter" data-target="3000">0</div>
                            <p>Supplies</p>
                        </div>
                    </div>
                    <div class="col-6 col-md-6 col-lg-3 mb-4">
                        <div class="counter-box">
                            <i class="fas fa-store icon"></i>
                            <div class="counter" data-target="30000">0</div>
                            <p>Retailers</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container">
                <div class="owl-carousel owl-theme" id="testimonial">
                    <div class="item">
                        <div class="testimonial-card">
                            <div class="testimonial-content">
                                <div class="stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <p class="testimonial-text">
                                    "Agrinostar" natural fertilizers helped increase our vegetable yield by 30%. We now
                                    grow healthier crops!”
                                </p>
                                <div class="testimonial-arrow"></div>
                            </div>
                            <div class="testimonial-footer">
                                <img src="{{ asset('website/images/profile2.webp') }}" alt="Johan Martin"
                                    class="testimonial-img">
                                <div class="testimonial-info">
                                    <h5>Ramesh Yadav</h5>
                                    <span>Farmer, Bihar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="testimonial-card">
                            <div class="testimonial-content">
                                <div class="stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <p class="testimonial-text">
                                    “Organic farming was tough until we partnered with Agrinostar. Their support and
                                    products are top-notch.”
                                </p>
                                <div class="testimonial-arrow"></div>
                            </div>
                            <div class="testimonial-footer">
                                <img src="{{ asset('website/images/profile2.webp') }}" alt="Johan Martin"
                                    class="testimonial-img">
                                <div class="testimonial-info">
                                    <h5>Savita Kumari</h5>
                                    <span>Grower, Madhya Pradesh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="testimonial-card">
                            <div class="testimonial-content">
                                <div class="stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <p class="testimonial-text">
                                    “Thanks to Agrinostar, we now practice sustainable farming without harming the
                                    environment.”
                                </p>
                                <div class="testimonial-arrow"></div>
                            </div>
                            <div class="testimonial-footer">
                                <img src="{{ asset('website/images/profile2.webp') }}" alt="Johan Martin"
                                    class="testimonial-img">
                                <div class="testimonial-info">
                                    <h5>Amit Sen</h5>
                                    <span>Horticulturist, West Bengal</span>
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
