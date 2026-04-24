// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Zap,
  BarChart3,
  Globe,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">AffiFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Earn More with{" "}
            <span className="text-primary">AffiFlow</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
            The simplest way to connect merchants and affiliates. 
            Promote products, track sales, and earn commissions — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 gap-2">
                Start Free Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>Instant Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Real-time Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Merchants */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">For Merchants</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Add Your Products</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Upload your products with pricing and set commission rates for affiliates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Affiliates Promote</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Affiliates discover your products and share them with their audience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Confirm & Pay</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      When a sale happens, confirm it and pay the affiliate their commission.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Affiliates */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">For Affiliates</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Browse Marketplace</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Explore products from various merchants and choose what fits your audience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Generate Links</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Create unique tracking links for products you want to promote.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Earn Commissions</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Share your links and earn commission on every sale you drive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AffiFlow?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to succeed in affiliate marketing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <DollarSign className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Fair Commissions</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Set your own commission rates. Merchants stay in control, affiliates earn fairly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track clicks, conversions, and earnings in real-time with our advanced analytics.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enterprise-grade security with Clerk authentication and encrypted data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with merchants and affiliates worldwide. No geographical limits.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Instant Setup</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get started in minutes. No technical knowledge required. Just sign up and go.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <BarChart3 className="h-12 w-12 text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive dashboards to monitor your performance and optimize earnings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What People Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join thousands of successful merchants and affiliates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">E-commerce Merchant</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  AffiFlow has transformed how we handle affiliate marketing. Our sales increased by 40% in just 2 months!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <h4 className="font-bold">Mike Chen</h4>
                    <p className="text-sm text-gray-500">Content Creator</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  As an affiliate, I love how easy it is to generate links and track my earnings. The dashboard is super clean and intuitive.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <h4 className="font-bold">Emma Rodriguez</h4>
                    <p className="text-sm text-gray-500">Digital Marketer</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  The manual confirmation system gives me full control over my affiliate payouts. No more disputes or confusion!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
            Join AffiFlow today and start earning through affiliate marketing. 
            It's free to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Join as Merchant
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="lg" variant="outline" className="text-lg px-8 gap-2">
                <Users className="h-5 w-5" />
                Join as Affiliate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">AffiFlow</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The simplest affiliate marketing platform for merchants and content creators.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#how-it-works">How it works</Link></li>
                <li><Link href="#testimonials">Testimonials</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/sign-up">Get Started</Link></li>
                <li><Link href="/sign-in">Sign In</Link></li>
                <li><a href="mailto:support@affiflow.com">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} AffiFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}