module.exports = (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    res.status(500).json({ error: "Variables d'environnement Supabase manquantes sur Vercel." });
    return;
  }

  res.setHeader("Cache-Control", "public, max-age=300");
  res.status(200).json({ supabaseUrl, supabaseAnonKey });
};
