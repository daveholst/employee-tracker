const { topLevelPrompt } = require('./utils/prompts');

const init = async () => {
  try {
    await topLevelPrompt.generate();
  } catch (error) {
    console.error(error);
  }
};
init();
