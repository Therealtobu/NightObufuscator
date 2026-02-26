module.exports = function(percent){
  const total = 10;
  const filled = Math.floor(total * percent);
  return "`" + "█".repeat(filled) + "░".repeat(total - filled) + "` " + Math.floor(percent * 100) + "%";
};
