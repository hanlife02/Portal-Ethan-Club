"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Edit, ExternalLink, Plus, Trash, Lock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { fetchServices, addService, updateService, deleteService } from "@/lib/api"
import Link from "next/link"
import Image from "next/image"

type Service = {
  id: string
  name: string
  description: string
  url: string
  icon: string
}

type ServiceGridProps = {
  isAdmin?: boolean
}

export function ServiceGrid({ isAdmin = false }: ServiceGridProps) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices()
        setServices(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load services",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [toast])

  const handleAddService = async (formData: FormData) => {
    try {
      const id = formData.get("id") as string
      const name = formData.get("name") as string
      const url = formData.get("url") as string

      // Validate required fields
      if (!id || !name || !url) {
        toast({
          title: "Validation Error",
          description: "ID, name, and URL are required fields",
          variant: "destructive",
        })
        return
      }

      const newService = {
        id,
        name,
        description: formData.get("description") as string,
        url,
        icon: (formData.get("icon") as string) || "default-icon",
      }

      setLoading(true)
      const result = await addService(newService)
      setServices([...services, result])
      setIsDialogOpen(false)
      toast({
        title: "Success",
        description: "Service added successfully",
      })
    } catch (error) {
      console.error("Error adding service:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add service",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateService = async (formData: FormData) => {
    if (!editingService) return

    try {
      const name = formData.get("name") as string
      const url = formData.get("url") as string

      // Validate required fields
      if (!name || !url) {
        toast({
          title: "Validation Error",
          description: "Name and URL are required fields",
          variant: "destructive",
        })
        return
      }

      const updatedService = {
        id: editingService.id,
        name,
        description: formData.get("description") as string,
        url,
        icon: (formData.get("icon") as string) || editingService.icon,
      }

      setLoading(true)
      const result = await updateService(updatedService.id, updatedService)
      setServices(services.map((s) => (s.id === result.id ? result : s)))
      setIsDialogOpen(false)
      setEditingService(null)
      toast({
        title: "Success",
        description: "Service updated successfully",
      })
    } catch (error) {
      console.error("Error updating service:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update service",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return
    }

    try {
      setLoading(true)
      await deleteService(id)
      setServices(services.filter((s) => s.id !== id))
      toast({
        title: "Success",
        description: "Service deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting service:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete service",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Function to render the appropriate icon for each service
  const renderServiceIcon = (service: Service) => {
    if (service.id === "lobechat" || service.icon === "chat-icon") {
      return (
        <div className="relative w-16 h-16">
          <Image src="/lobe-icon.webp" alt="LobeChat" fill className="object-contain" />
        </div>
      )
    } else if (service.id === "newapi" || service.icon === "api-icon") {
      return (
        <div className="relative w-16 h-16">
          <Image src="/newapi-logo.png" alt="NewAPI" fill className="object-contain" />
        </div>
      )
    } else {
      // Default icon for other services
      return <div className="text-4xl">🔧</div>
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-700"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-navy-800 dark:text-pink-200">Our Services</h2>

          {isAdmin && isAuthenticated && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingService(null)} className="bg-navy-700 hover:bg-navy-800 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
                  <DialogDescription>
                    {editingService ? "Update the service details below." : "Fill in the details for the new service."}
                  </DialogDescription>
                </DialogHeader>

                <form action={editingService ? handleUpdateService : handleAddService}>
                  {!editingService && (
                    <div className="grid w-full items-center gap-2 mb-4">
                      <Label htmlFor="id">ID</Label>
                      <Input id="id" name="id" placeholder="service-id" required />
                    </div>
                  )}

                  <div className="grid w-full items-center gap-2 mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Service Name"
                      required
                      defaultValue={editingService?.name || ""}
                    />
                  </div>

                  <div className="grid w-full items-center gap-2 mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Service Description"
                      defaultValue={editingService?.description || ""}
                    />
                  </div>

                  <div className="grid w-full items-center gap-2 mb-4">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      name="url"
                      placeholder="https://example.com"
                      required
                      defaultValue={editingService?.url || ""}
                    />
                  </div>

                  <div className="grid w-full items-center gap-2 mb-4">
                    <Label htmlFor="icon">Icon</Label>
                    <Input
                      id="icon"
                      name="icon"
                      placeholder="icon-name"
                      defaultValue={editingService?.icon || "default-icon"}
                    />
                  </div>

                  <DialogFooter className="mt-4">
                    <Button type="submit">{editingService ? "Update" : "Add"} Service</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Card className="h-full overflow-hidden border-2 border-transparent hover:border-pink-300 dark:hover:border-navy-600 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-navy-800 dark:text-pink-200">{service.name}</CardTitle>
                    {isAdmin && isAuthenticated && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingService(service)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-center justify-center bg-gray-100 dark:bg-navy-800 rounded-md mb-4">
                    {renderServiceIcon(service)}
                  </div>
                </CardContent>
                <CardFooter>
                  {isAuthenticated ? (
                    <Button asChild className="w-full bg-navy-700 hover:bg-navy-800 text-white">
                      <a href={service.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open Service
                      </a>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="w-full bg-gray-400 hover:bg-gray-500 text-white cursor-pointer"
                      onClick={() => {
                        toast({
                          title: "Authentication Required",
                          description: "Please sign in to access this service",
                        })
                      }}
                    >
                      <Link href="/login">
                        <Lock className="mr-2 h-4 w-4" />
                        Sign in to Access
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
