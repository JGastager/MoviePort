<template>
    <Teleport to="body">
        <!-- <Transition name="modal"> -->
        <div class="login-modal fixed left-0 top-0 z-100 h-screen w-screen flex cursor-default items-center justify-center bg-primary/20 backdrop-blur-md" @click.self="$modalRouter.close()">
            <div class="modal relative h-fit w-fit">
                <div class="h-60vh w-50vw overflow-hidden rounded bg-secondary px-20">
                    <LoginForm />
                </div>
                <div class="absolute top-0 translate-x-full transform -right-3 button" @click="$modalRouter.close()">
                    <span class="i-ph-x-bold size-6" />
                </div>
            </div>
        </div>
        <!-- </Transition> -->
    </Teleport>
</template>
