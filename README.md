# Are They Real? - IP Verification Tool

## Description
A web application that helps users verify if an IP address belongs to a potential scammer by checking our database of reported IPs and providing geolocation information.

## Target Browsers
- Chrome (latest version)
- Safari (latest version)
- Edge (latest version)



## Developer Manual

### Installation
1. Clone the repository:
   git clone: [git@github.com:CGNjea/FINAL377_JodiAryee.git](https://github.com/CGNjea/FINAL377_JodiAryee.git)

2. Install dependencies:
   npm install
   nodes
3. Create a `.env` file with your Supabase credentials:
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key

### Running the Application
Start the development server:
npm start

### API Documentation
#### GET `/api/reports`
- Returns all reported IPs
- Example response:
  ```json
  [
    {
      "ip": "123.45.67.89",
      "platform": "instagram",
      "reason": "Phishing attempt"
    }
  ]

#### POST `/api/reports`
- Submit a new IP report
- Required fields: ip, platform, reason
- Example request:
  ```json
  {
    "ip": "123.45.67.89",
    "platform": "tinder",
    "reason": "Fake profile"
  }

### Known Issues
- IP geolocation may not be 100% accurate
- No user authentication system yet
- Json files may be incomplete due to personal device issues so attepmpt installing Nodes.js through Command Prompt
- Substancial reports need to be made before the database can identify scammers

### Future Development
- Implement IP reputation scoring
- Add admin dashboard for report management
- Monitor misuse
