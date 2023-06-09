/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useToast } from "../../components/ui/use-toast"




// import React from "react"
import { createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword, User } from 'firebase/auth'
import { PrimitiveAtom, useAtom } from "jotai"
import { Loader2 } from "lucide-react"

const Auth = ({auth,currentUser}:{auth: Auth ,currentUser: PrimitiveAtom<User | null>}) => {
    const [creating, setCreating] = useState(false)
    const [logining, setlogining] = useState(false)

    const [, setUser] = useAtom(currentUser)
    const {toast} = useToast()

    function signup(e: any){
        e.preventDefault()
        setCreating(true)

        const form = e.target
        const email = form.newEmail.value
        const password = form.newPassword.value
        const PasswordConfirm = form.newPasswordConfirm.value

        if (PasswordConfirm !== password){
            toast({
                variant: "destructive",
                title: "Wrong Password Confirmation",
                description: "Password is not equal",
            })
            return;
        }
        
        createUserWithEmailAndPassword(auth, email, password)
            .then(cred => {
                console.log(cred.user)
                // setUser(cred.user)
                toast({
                    title: "Auth Success",
                    description: cred.user.email,
                })
            })
            .catch(err => {
                console.log(err)
                toast({
                    variant: "destructive",
                    title: "Auth Failed",
                    description: err.message,
                })
                setCreating(false)
            })
        
    }

    function login(e:any){
        e.preventDefault()
        setlogining(true)
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
                console.log(cred.user)
                // setUser(cred.user)
                toast({
                    title: "Auth Success",
                    description: cred.user.email,
                })
            })
            .catch(err => {
                console.log(err)
                toast({
                    variant: "destructive",
                    title: "Auth Failed",
                    description: err.message,
                })
                setlogining(false)
            })


    }

    return ( 
        <article>
            <Tabs defaultValue="login" className="w-[400px] mx-auto">
            <TabsList className="grid w-full grid-cols-2 h-auto">
                <TabsTrigger className="py-3" value="login">Login</TabsTrigger>
                <TabsTrigger className="py-3" value="signup">Sign-up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
                <Card>
                <form onSubmit={login}>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Login to your Account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="username" name="email" type="email" placeholder="user@example.com" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="current-password" type="password" name="password" placeholder="**** ****" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={logining}>Login {logining && <Loader2 className="ml-2 h-4 w-4 animate-spin"/>}</Button>
                </CardFooter>
                </form>
                </Card>
            </TabsContent>

            <TabsContent value="signup">
                <Card>
                <form onSubmit={signup}>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>
                        Create you Account here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="newEmail">Email</Label>
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="username" name="newEmail" placeholder="user@example.com" type="email" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="newPassword">Password</Label>
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="new-password" name="newPassword" placeholder="**** ****" type="password" />
                    </div>
                    <div className="space-y-1">
                    {/* <Label htmlFor="newPassword">Password</Label> */}
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="new-password" name="newPasswordConfirm" placeholder="Password confirm" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={creating}>Create {creating && <Loader2 className="ml-2 h-4 w-4 animate-spin"/>}</Button>
                </CardFooter>
                </form>
                </Card>
            </TabsContent>
            </Tabs>
        </article>
     );
}
 
export default Auth;