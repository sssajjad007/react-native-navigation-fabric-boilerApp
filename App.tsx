import { startSplash } from '@navigation/navigation';
import { registerScreens } from '@screens/index';

export async function start() {
  registerScreens();
  await startSplash();
}
