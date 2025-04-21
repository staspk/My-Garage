#include <glad/glad.h> 
#include <GLFW/glfw3.h>

#include <iostream>
#include <stdlib.h>

#include "camera.cpp"


GLFWwindow* CreateBorderlessFullScreenWindow();
void framebuffer_size_callback(GLFWwindow* window, int width, int height);
void processInput(GLFWwindow* window);


int ScreenWidth, ScreenHeight;

int main(void)
{
    GLFWwindow* window = CreateBorderlessFullScreenWindow();


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