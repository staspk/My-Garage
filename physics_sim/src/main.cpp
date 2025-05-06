#include <glad/glad.h> 
#include <GLFW/glfw3.h>

#include <iostream>
#include <stdlib.h>
#include <chrono>

#include "cube.cpp"
#include "camera.cpp"


GLFWwindow* CreateBorderlessFullScreenWindow();
void framebuffer_size_callback(GLFWwindow* window, int width, int height);
void processInput(GLFWwindow* window);



int ScreenWidth, ScreenHeight;
Camera camera(glm::vec3(0.0f, 0.0f, 3.0f));

float deltaTime = 0.0f;     // time between current frame and last frame
float lastFrame = 0.0f;

int main(void)
{
    //exit(0);

    GLFWwindow* window = CreateBorderlessFullScreenWindow();

    int ticks = 0;  
    auto start = std::chrono::high_resolution_clock::now();
    while (!glfwWindowShouldClose(window))
    {
        // per-frame time logic
        float currentFrame = static_cast<float>(glfwGetTime());
        deltaTime = currentFrame - lastFrame;
        lastFrame = currentFrame;


        if (ticks % 10) {
            std::cout << "ticks == " << ticks << std::endl;
        }



        processInput(window);

        glfwSwapBuffers(window);
        glfwPollEvents();
        ticks++;
    }

    glfwDestroyWindow(window);
    glfwTerminate();
    return 0;
}

void processInput(GLFWwindow* window)
{
    if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)  glfwSetWindowShouldClose(window, true);

    if (glfwGetKey(window, GLFW_KEY_W) == GLFW_PRESS)   camera.ProcessKeyboard(FORWARD, deltaTime);
    if (glfwGetKey(window, GLFW_KEY_S) == GLFW_PRESS)   camera.ProcessKeyboard(BACKWARD, deltaTime);
    if (glfwGetKey(window, GLFW_KEY_A) == GLFW_PRESS)   camera.ProcessKeyboard(LEFT, deltaTime);
    if (glfwGetKey(window, GLFW_KEY_D) == GLFW_PRESS)   camera.ProcessKeyboard(RIGHT, deltaTime);
}

void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
    ScreenWidth = width;
    ScreenHeight = height;
    glViewport(0, 0, width, height);
}

void mouse_callback(GLFWwindow* window, double xposIn, double yposIn)
{
    float xpos = static_cast<float>(xposIn);
    float ypos = static_cast<float>(yposIn);

    if (firstMouse)
    {
        lastX = xpos;
        lastY = ypos;
        firstMouse = false;
    }

    float xoffset = xpos - lastX;
    float yoffset = lastY - ypos; // reversed since y-coordinates go from bottom to top

    lastX = xpos;
    lastY = ypos;

    //camera.ProcessMouseMovement(xoffset, yoffset);
}

GLFWwindow* CreateBorderlessFullScreenWindow()
{
    if (!glfwInit()) {
        std::cerr << "Failed to init GLFW!" << std::endl;
        return nullptr;
    }

    GLFWmonitor* monitor = glfwGetPrimaryMonitor();
    const GLFWvidmode* mode = glfwGetVideoMode(monitor);

    glfwWindowHint(GLFW_DECORATED, GLFW_FALSE);
    GLFWwindow* window = glfwCreateWindow(mode->width, mode->height, "OpenGL Physics Simulation", NULL, NULL);

    if (!window) {
        glfwTerminate();
        std::cerr << "Failed to create GLFW window!" << std::endl;
        exit(-1);
    }

    glfwMakeContextCurrent(window);

    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) {
        glfwDestroyWindow(window);
        glfwTerminate();
        std::cerr << "Failed to init GLAD!" << std::endl;
        exit(-1);
    }

    glfwGetFramebufferSize(window, &ScreenWidth, &ScreenHeight);
    glViewport(0, 0, ScreenWidth, ScreenHeight);
    glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

    return window;
}