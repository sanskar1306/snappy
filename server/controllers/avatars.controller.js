const multiavatar = require('@multiavatar/multiavatar')

module.exports.getAvatars = async (req,res,next) => {
    const avatars = [];

    for (let i = 0; i < 6; i++) {
        const svgCode = multiavatar(Math.round(Math.random() * 1000)); // Generate avatar SVG code
        avatars.push(svgCode);
    }

    if (avatars.length > 0) {
        res.json(avatars); // Return the avatars as JSON
    } else {
        res.status(500).json({ error: 'Failed to generate avatars' }); // Handle the case where no avatars are generated
    }
}