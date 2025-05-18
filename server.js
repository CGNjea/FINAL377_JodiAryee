const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase connection
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json());

//Get IP reports from database
app.get('/api/reports', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Save new report
app.post('/api/reports', async (req, res) => {
  const { ip, reason, platform } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('reports')
      .insert([{ ip, reason, platform }]);
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Existing signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, password, username } = req.body;

  // 1. Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username } // Store username in metadata
    }
  });

  if (authError) {
    return res.status(400).json({ error: authError.message });
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .insert([
      { 
        user_id: authData.user.id, 
        username,
        email 
      }
    ]);

  if (profileError) {
    return res.status(400).json({ error: profileError.message });
  }
  res.json({ 
    success: true,
    user: authData.user 
  });
});

//Supabase table
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password before storing (use bcrypt)
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email, password: hashedPassword }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});