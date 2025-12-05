'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  return (
    <>
      <Navbar activePage="checkout" />

      <section className="checkout-header">
        <div className="container">
          <div className="checkout-progress">
            <div className="progress-step active">
              <div className="step-number">1</div>
              <span>Information</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <div className="step-number">2</div>
              <span>Shipping</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <div className="step-number">3</div>
              <span>Payment</span>
            </div>
          </div>
        </div>
      </section>

      <section className="checkout-content">
        <div className="container">
          <div className="checkout-layout">
            <div className="checkout-form">
              <form>
                <div className="form-section">
                  <h2>Contact Information</h2>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" required />
                  </div>
                </div>

                <div className="form-section">
                  <h2>Shipping Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input id="firstName" type="text" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input id="lastName" type="text" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input id="address" type="text" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input id="city" type="text" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <select id="state" required>
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code</label>
                      <input id="zipCode" type="text" required />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2>Payment Information</h2>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input id="expiryDate" type="text" placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input id="cvv" type="text" placeholder="123" required />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="order-summary">
              <div className="summary-header">
                <h2>Order Summary</h2>
              </div>
              <div className="summary-totals">
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div className="total-line">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="total-line total-final">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
              </div>
              <button className="btn btn-primary btn-large btn-full">
                <i className="fas fa-lock"></i>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}