---
title: Fundraising Support
hero_kicker: Support ISPVP
hero_title: Fundraising And Donations
hero_text: Support ISPVP student travel awards and scientific outreach through secure Stripe donation checkout.
---

<section class="card registration-flow" aria-label="Fundraising and donations">
  <h2>Fundraising Support</h2>
  <p class="small">
    Thank you for supporting the ISPVP community. Donations help student travel awards and outreach initiatives.
  </p>

  <form id="fundraising-form" data-donation-form>
    <div class="form-grid two-col">
      <div>
        <label for="donorFirstName">First Name</label>
        <input id="donorFirstName" name="donorFirstName" type="text" placeholder="Jane" required>
      </div>
      <div>
        <label for="donorLastName">Last Name</label>
        <input id="donorLastName" name="donorLastName" type="text" placeholder="Smith" required>
      </div>
    </div>

    <div class="form-grid two-col">
      <div>
        <label for="donorEmail">Email</label>
        <input id="donorEmail" name="donorEmail" type="email" placeholder="jane.smith@example.edu" required>
      </div>
      <div>
        <label for="donorTitle">Official Title (Business Title)</label>
        <input id="donorTitle" name="donorTitle" type="text" placeholder="Professor" required>
      </div>
    </div>

    <div class="form-grid">
      <div>
        <label for="donorAffiliation">Affiliation / Institution (optional)</label>
        <input id="donorAffiliation" name="donorAffiliation" type="text" placeholder="ISPVP supporter">
      </div>
    </div>

    <button class="button" type="submit" data-donation-submit>
      Donate Via Secure Checkout
    </button>
    <p class="small" id="donation-message" aria-live="polite"></p>
  </form>
</section>

<div class="callout">
  Donation payments redirect to a dedicated thank-you result page and do not require abstract submission.
</div>

<p>
  <a class="button secondary" href="{{ '/registration/' | relative_url }}">Back To Registration</a>
</p>
