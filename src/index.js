import '@/styles/index.scss'
import { setDefaultSettings, getEllipse, getCube } from "@/shapes";

const sphere = getEllipse();
const cube = getCube();

const render = setDefaultSettings(cube);
render();