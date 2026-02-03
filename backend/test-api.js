/**
 * Test the contact form API endpoint
 */

const testData = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  message: 'This is a test message'
};

const apiUrl = 'https://cognidrift-send-and-receive-sms-production.up.railway.app/api/contact';

console.log('🧪 Testing Contact Form API');
console.log('URL:', apiUrl);
console.log('Data:', testData);
console.log('\n📤 Sending request...\n');

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
  .then(response => {
    console.log('📥 Response Status:', response.status, response.statusText);
    return response.json();
  })
  .then(data => {
    console.log('📦 Response Data:', data);
    if (data.success) {
      console.log('\n✅ API is working! Check if email arrives.');
    } else {
      console.log('\n❌ API returned an error:', data.error);
    }
  })
  .catch(error => {
    console.error('\n❌ Request failed:', error.message);
    console.log('\n⚠️  Possible issues:');
    console.log('   - Backend server is not running');
    console.log('   - Network/firewall blocking the request');
    console.log('   - Wrong API URL');
  });
