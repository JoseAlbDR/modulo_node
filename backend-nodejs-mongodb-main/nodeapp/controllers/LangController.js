class LangController {
  static translate = (req, res, next) => {
    const { locale } = req.params;
    // poner una cookie con el nuevo idioma

    res.cookie('nodeapp-locale', locale, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    // responder con una redirección a la misma página de la que venía
    res.redirect(req.get('referer'));
  };
}

module.exports = LangController;
