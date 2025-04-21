#include <glad/glad.h> 
#include <GLFW/glfw3.h>

#include <iostream>

#include "camera.cpp"


GLFWwindow* glfwStart();
void framebuffer_size_callback(GLFWwindow* window, int width, int height);
void processInput(GLFWwindow* window);


int ScreenWidth, ScreenHeight;

int main(void)
{
    GLFWwindow* window = glfwStart();
    if (!window) return -1;


    Camera camera = Camera();


    int ticks = 0;
    while (!glfwWindowShouldClose(window))
    {
        processInput(window);

        std::cout << ScreenWidth << " " << ScreenHeight << std::endl;

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
    if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
        glfwSetWindowShouldClose(window, true);
}

void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
    ScreenWidth = width;
    ScreenHeight = height;
    glViewport(0, 0, width, height);
}

GLFWwindow* glfwStart()
{
    if (!glfwInit()) {
        std::cerr << "Failed to init GLFW!" << std::endl;
        return nullptr;
    }

    glfwWindowHint(GLFW_MAXIMIZED, GLFW_TRUE);
    GLFWwindow* window = glfwCreateWindow(640, 480, "OpenGl Physics Simulation", NULL, NULL);

    if (!window) {
        glfwTerminate();
        std::cerr << "Failed to create GLFW window!" << std::endl;
        return nullptr;
    }

    glfwMakeContextCurrent(window);

    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) {
        glfwDestroyWindow(window);
        glfwTerminate();
        std::cerr << "Failed to init GLAD!" << std::endl;
        return nullptr;
    }

    glfwGetFramebufferSize(window, &ScreenWidth, &ScreenHeight);
    glViewport(0, 0, ScreenWidth, ScreenHeight);
    glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

    return window;
}