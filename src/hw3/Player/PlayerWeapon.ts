import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../../Wolfie2D/Rendering/Animations/ParticleSystem";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { HW3PhysicsGroups } from "../HW3PhysicsGroups";
import { HW3Events } from "../HW3Events";

 

/**
 * // TODO get the particles to move towards the mouse when the player attacks
 * 
 * The particle system used for the player's attack. Particles in the particle system should
 * be spawned at the player's position and fired in the direction of the mouse's position.
 */
export default class PlayerWeapon extends ParticleSystem {
    scene: any;

    constructor(poolSize: number, sourcePoint: Vec2, lifetime: number, size: number, mass: number, maxParticlesPerFrame: number) {
        super(poolSize, sourcePoint, lifetime, size, mass, maxParticlesPerFrame);
    }

    public getPool(): Readonly<Array<Particle>> {
        return this.particlePool;
    }

    /**
     * @returns true if the particle system is running; false otherwise.
     */
    public isSystemRunning(): boolean { return this.systemRunning; }

    /**
     * Sets the animations for a particle in the player's weapon
     * @param particle the particle to give the animation to
     */
    public setParticleAnimation(particle: Particle) {
        // Give the particle a velocity towards the mouse position
        let mousePos = this.scene.getMousePosition();
        let dir = mousePos.difference(this.sourcePoint);
        dir.normalize();
        let speed = RandUtils.randFloat(300, 400);
        particle.vel = dir.scaled(speed);

        // Set particle properties
        particle.color = Color.RED;
        particle.alpha = 1;

        // Set up animation frames and timing
        const frames = 10;
        const frameDuration = this.lifetime / frames;
        let currentFrame = 0;

        // Set up animation callback
        const animate = () => {
            currentFrame += 1;
            if (currentFrame <= frames) {
                particle.alpha = 1 - currentFrame / frames;
            } else {
                particle.alpha = 0;
                particle.vel = new Vec2(0, 0);
                particle.aiActive = false;
            }
        }
    }
}